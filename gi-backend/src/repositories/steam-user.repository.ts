import {inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PostgresSqlDataSource} from '../datasources';
import {SteamUser} from '../models/steam-user.model';

export class SteamUserRepository extends DefaultCrudRepository<
  SteamUser,
  typeof SteamUser.prototype.steamId
> {
  constructor(
    @inject('datasources.PostgresSQL') dataSource: PostgresSqlDataSource,
  ) {
    super(SteamUser, dataSource);
  }
}
