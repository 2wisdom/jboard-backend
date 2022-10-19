import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PasswordProvider } from '../auth/password-provider';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRegisterDto } from './user-register.dto';
import { UserService } from './user.service';
import { nanoid } from 'nanoid';

@ApiTags('유저')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private password: PasswordProvider,
  ) {}

  @ApiOperation({ summary: '회원정보 조회' })
  @UseGuards(JwtAuthGuard)
  @Get('info')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async register(@Body() user: UserRegisterDto) {
    const findByEmail = await this.userService.findByEmail(user.email);
    if (!!findByEmail) {
      throw new BadRequestException({
        statusCode: 401,
        message: '이미 사용중인 이메일 입니다',
      });
    }

    const encPassword = await this.password.encode(user.password);

    const { id } = await this.userService.save({
      name: user.nickname,
      password: encPassword,
      email: user.email,
      id: nanoid(),
    });

    return {
      id,
    };
  }
}
