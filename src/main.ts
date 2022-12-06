import { HttpException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DynamicSupplierConfigFactory } from './base/helpers/DynamicSupplierConfigFactory';
import { ApiException } from './base/helpers/APICallMapper';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  const documentConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API descriptions')
    .setVersion('1.0.0')
    .setContact('Muhammet Ece', null, 'muhammet.ece.95@gmail.com')
    .addBearerAuth({ type: 'http', bearerFormat: 'Token' }, 'authorization')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup('/api/docs', app, document);

  const port = DynamicSupplierConfigFactory.get('app').get('port');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new HttpException(
          new ApiException(503, Object.values(errors[0].constraints)[0]),
          503,
        );
      },
    }),
  );
  await app.listen(port | 3032).then(() => {
    console.log(`App listening port ${port}`);
  });
}
bootstrap();
