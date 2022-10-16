import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { IStrategyOptionsWithRequest, Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    } as IStrategyOptionsWithRequest);
  }

  async validate(req: Request): Promise<any> {
    console.log('LocalValidate', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
