import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordProvider {
  private readonly salt = 10;

  encode(plainPassword: string) {
    return bcrypt.hash(plainPassword, this.salt);
  }

  matches(plainPassword: string, encodedPassword: string) {
    return bcrypt.compare(plainPassword, encodedPassword);
  }
}
