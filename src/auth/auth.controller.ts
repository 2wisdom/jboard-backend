import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './login-dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '로그인',
    requestBody: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: '사용자 이메일',
                nullable: false,
                example: 'example@example.com',
              },
              password: {
                type: 'string',
                description: '비밀번호',
                nullable: false,
                example: '1234',
              },
            },
          },
        },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<LoginDto> {
    return this.authService.login(req.user);
  }
}
