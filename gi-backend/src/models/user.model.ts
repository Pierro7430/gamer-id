import {Entity, model, property} from '@loopback/repository';
import {PasswordHasher} from '../services/password-hasher';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<User>) {
    super(data);
  }

  async setPassword(password: string, passwordHasher: PasswordHasher) {
    const hashedPassword = await passwordHasher.hashPassword(password);
    this.password = hashedPassword;
  }

  async verifyPassword(
    password: string,
    passwordHasher: PasswordHasher,
  ): Promise<boolean> {
    return await passwordHasher.comparePassword(password, this.password);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
