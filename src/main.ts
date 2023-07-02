import { NestFactory }    from '@nestjs/core';
import { AppModule }      from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }))

  const config = new DocumentBuilder().setTitle('Hermes CRUD')
  .setDescription("Hermes API Docs")
  .setVersion('v1')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth', // matching with @ApiBearerAuth() in controller
  )
  .addSecurityRequirements('JWT-auth')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
