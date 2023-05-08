import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }))

  const config = new DocumentBuilder().setTitle('Demo GET/POST')
  .setDescription("Demo API Docs")
  .setVersion('v1')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
