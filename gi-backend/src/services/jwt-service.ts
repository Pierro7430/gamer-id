import {sign, verify} from 'jsonwebtoken';

export class JWTService {
  generateToken(payload: any, secret: string, expiresIn: string | number) {
    return sign(payload, secret, {expiresIn});
  }

  verifyToken(token: string, secret: string) {
    try {
      return verify(token, secret);
    } catch (error) {
      return null;
    }
  }
}
