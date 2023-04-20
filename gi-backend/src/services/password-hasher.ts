import {hash, compare} from 'bcryptjs';

export class PasswordHasher {
  async hashPassword(password: string, rounds: number) {
    return await hash(password, rounds);
  }

  async comparePassword(providedPassword: string, storedPassword: string) {
    return await compare(providedPassword, storedPassword);
  }
}