import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Konfigurasi CORS dengan spesifik origin
  app.enableCors({
    origin: 'http://localhost:3000', // Sesuaikan dengan origin frontend Anda
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Izinkan pengiriman cookie
  });

  // Set up global pipes dengan whitelist dan transform
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Hapus properti yang tidak ada di DTO
      transform: true, // Transform payload ke instance DTO
    }),
  );

  // Set up global interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('Backend EventIvest')
    .setDescription('The Developer Backend API Management Event')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Set up global filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Ambil port dari environment variable atau fallback ke 8000
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application running on port ${port}`);
}

bootstrap();

//p
