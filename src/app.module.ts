import { Module } from '@nestjs/common';
import {CategoryModule} from "./category/category.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot({
        ignoreEnvFile: true,
        isGlobal: true,
      }),
      CategoryModule
  ],
})
export class AppModule {}
