import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await corsConfig(app);
    await app.listen(3000);
  } catch (error) {
    throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  
}

async function corsConfig(app: INestApplication): Promise<void> {
  const whitelist = ['localhost'];
  app.enableCors({
    /*origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || typeof origin === undefined) {
        console.log("allowed cors for:", origin)
        callback(null, true);
      } else {
        console.log("blocked cors for:", origin)
        callback(new Error('Not allowed by CORS'))
      }
    },*/
    origin: (origin, callback) => setOrigin(origin, callback),
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
    });
}

function setOrigin(origin: string, callback: Function): void {
  const whitelist = ['http://localhost:3001', undefined];
  // console.error('origin:', origin);
  // console.error('is whitelisted:', whitelist.includes(origin));
  if (whitelist.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}

bootstrap();
