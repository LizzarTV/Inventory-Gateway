import { Module } from '@nestjs/common';
import {CategoryModule} from "./category/category.module";
import {ConfigModule} from "@nestjs/config";
import {ItemModule} from "./item/item.module";
import {AmqpModule} from "./amqp.module";
import {LocationModule} from "./location/location.module";
import {CompanyModule} from "./company/company.module";
import {SizeModule} from "./size/size.module";

@Module({
  imports: [
      ConfigModule.forRoot({
        ignoreEnvFile: true,
        isGlobal: true,
      }),
      AmqpModule,
      CategoryModule,
      ItemModule,
      LocationModule,
      CompanyModule,
      SizeModule
  ],
})
export class AppModule {}
