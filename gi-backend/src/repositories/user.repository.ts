import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GamerIdPostgresDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.gamerIdPostgres') dataSource: GamerIdPostgresDataSource,
  ) {
    super(User, dataSource);
  }
}
