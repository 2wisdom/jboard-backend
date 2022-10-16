import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  @ApiOperation({ summary: '회원정보 조회' })
  @UseGuards(JwtAuthGuard)
  @Get('info')
  getProfile(@Request() req) {
    return req.user;
  }
}
