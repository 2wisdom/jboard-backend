import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('JBoard API')
    .setDescription(
      '이 프로젝트는 JBoard API 프로젝트로 누구나 사용 할 수 있습니다',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.useStaticAssets(path.join(__dirname, '/static'), {
    prefix: '/docs',
  });

  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3002;

  await app.listen(port);
  const runningUrl = await app.getUrl();
  Logger.log(`app runnint at ${runningUrl}`);
}
bootstrap();
