import {injectable, BindingScope} from '@loopback/core';
import bcrypt from 'bcryptjs';

@injectable({scope: BindingScope.TRANSIENT})
export class PasswordHasher {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
