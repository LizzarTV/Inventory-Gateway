import { Module } from '@nestjs/common';
import {CategoryModule} from "./category/category.module";
import {ConfigModule} from "@nestjs/config";
import {ItemModule} from "./item/item.module";

@Module({
  imports: [
      ConfigModule.forRoot({
        ignoreEnvFile: true,
        isGlobal: true,
      }),
      CategoryModule,
      ItemModule,
  ],
})
export class AppModule {}
