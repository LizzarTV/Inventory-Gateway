import { HttpException, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await corsConfig(app);
    await app.listen(3000);
  } catch (error) {
    throw new HttpException(error);
  }
  
}

async function corsConfig(app: INestApplication): Promise<void> {
  const whitelist = ['http://localhost:3000', 'http://localhost:3000/categories', 'http://localhost:3000/items'];
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || typeof origin === undefined) {
        console.log("allowed cors for:", origin)
        callback(null, true);
      } else {
        console.log("blocked cors for:", origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
    });
}

bootstrap();
