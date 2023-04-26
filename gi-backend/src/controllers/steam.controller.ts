import {
  get,
  post,
  RestBindings,
  Response,
  Request,
  HttpErrors,
  param
} from '@loopback/rest';
import {inject} from '@loopback/core';
import {SteamService} from '../services/steam.service';

export class SteamController {
  constructor(
    @inject('services.SteamService')
    private steamService: SteamService,
  ) {}

  @get('/steam/authenticate')
  async authenticate(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ): Promise<void> {
    try {
      await this.steamService.authenticate(req, res);
    } catch (err) {
      throw new HttpErrors.InternalServerError(err.message);
    }
  }

  @get('/steam/return')
  async handleSteamReturn(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ): Promise<void> {
    try {
      await this.steamService.handleSteamReturn(req, res);
    } catch (err) {
      throw new HttpErrors.InternalServerError(err.message);
    }
  }

  @get('/steam/profile/{steamId}')
  async getProfile(
    @param.path.string('steamId') steamId: string,
  ): Promise<any> {
    try {
      return await this.steamService.getSteamProfile(steamId);
    } catch (err) {
      throw new HttpErrors.InternalServerError(err.message);
    }
  }

  @get('/steam/games/{steamId}')
  async getUserOwnedGames(
    @param.path.string('steamId') steamId: string,
  ): Promise<any> {
    try {
      const ownedGames = await this.steamService.getUserOwnedGames(steamId);
      return ownedGames;
    } catch (err) {
      throw new HttpErrors.InternalServerError(err.message);
    }
  }
}
