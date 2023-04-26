import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class SteamUser extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  steamId: string;

  @property({
    type: 'string',
  })
  username: string;

  // Ajoutez d'autres propriétés ici

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<SteamUser>) {
    super(data);
  }
}