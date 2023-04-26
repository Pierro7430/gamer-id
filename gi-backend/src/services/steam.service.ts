import {repository} from '@loopback/repository';
import {inject} from '@loopback/core';
import {SteamUserRepository} from '../repositories';
import {SteamUser} from '../models';
import {JWTService} from './jwt-service';
import {Strategy as SteamStrategy} from 'passport-steam';
import {Request, Response} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';
import SteamAPI from 'steamapi';

export class SteamService {
  private steam: SteamAPI;

  constructor(
    @repository(SteamUserRepository)
    private steamUserRepository: SteamUserRepository,
    @inject('services.jwt-service')
    private jwtService: JWTService,
  ) {
    if (!process.env.STEAM_API_KEY) {
      throw new Error('STEAM_API_KEY is not set in the environment variables');
    }

    this.steam = new SteamAPI(process.env.STEAM_API_KEY);

    // Configure SteamStrategy
    passport.use(
      new SteamStrategy(
        {
          returnURL: `${process.env.APP_URL}/steam/return`,
          realm: process.env.APP_URL,
          apiKey: process.env.STEAM_API_KEY
        },
        (identifier: string, profile: any, done: any) => {
          // Identifier is a unique identifier for the user based on their Steam account
          const steamId = identifier.split('/').pop()!;

          // Create a SteamUser object with the data received from Steam
          const steamUserData: Partial<SteamUser> = {
            steamId,
            username: profile.displayName,
          };

          const req = done.req;
          const token = req.headers['x-auth-token'];

          if (!token) {
            return done(new Error('No token provided'));
          }

          let decodedToken;
          try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
          } catch (error) {
            return done(error);
          }

          const userId = parseInt((decodedToken as JwtPayload).userId, 10);

          steamUserData.userId = userId;

          this.steamUserRepository
            .findOne({where: {steamId}})
            .then((existingSteamUser) => {
              if (existingSteamUser) {
                return done(
                  new Error('This Steam account is already linked to a user'),
                );
              }

              this.steamUserRepository
                .create(steamUserData)
                .then((createdSteamUser) => {
                  return done(null, createdSteamUser);
                })
                .catch((error) => {
                  return done(error);
                });
            })
            .catch((error) => {
              return done(error);
            });
        },
      ),
    );
  }

  authenticate(req: Request, res: Response): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      passport.authenticate('steam', {session: false}, (err: Error | null, user?: SteamUser) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })(req, res);
    });
  }

  handleSteamReturn(req: Request, res: Response): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      passport.authenticate('steam', {session: false}, (err: Error | null, user?: SteamUser) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })(req, res);
    });
  }

  async getSteamProfile(steamId: string): Promise<any> {
    try {
      const steamProfile = await this.steam.getUserSummary(steamId);
      return steamProfile;
    } catch (error) {
      throw new Error(`Error fetching Steam profile: ${error.message}`);
    }
  }

  // Ajoutez cette méthode à la classe SteamService
  async getUserOwnedGames(steamId: string): Promise<any> {
    try {
      const ownedGames = await this.steam.getUserOwnedGames(steamId);
      return ownedGames;
    } catch (error) {
      throw new Error(`Error fetching owned games: ${error.message}`);
    }
  }
}
