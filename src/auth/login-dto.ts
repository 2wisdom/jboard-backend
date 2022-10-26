import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '로그인 Access Token' })
  access_token: string;
}
