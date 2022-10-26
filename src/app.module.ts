import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import configuration from './config/configuration';
import { PostEntity } from './entities/post.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        port: 3306,
        host: config.getOrThrow('database.host'),
        username: config.getOrThrow('database.user'),
        password: config.getOrThrow('database.pass'),
        database: config.getOrThrow('database.name'),
        entities: [PostEntity, UserEntity],
        synchronize: true,
      }),
    }),
    PostsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
