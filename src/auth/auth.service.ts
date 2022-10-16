import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import _ from 'lodash';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import { PasswordProvider } from './password-provider';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private passwordProvider: PasswordProvider,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'User Not Found',
      });
    }

    const isMatches = await this.passwordProvider.matches(pass, user.password);

    if (!isMatches) {
      console.log('isMatches failed');
      return null;
    }

    return _.omit(user, ['password']);
  }

  async login(user: Omit<UserEntity, 'password'>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
