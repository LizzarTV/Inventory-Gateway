import {Module} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CategoryController} from "./category.controller";
import {ClientProxyFactory, RmqOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {RmqUrl} from "@nestjs/microservices/external/rmq-url.interface";
import {Serializer} from "@nestjs/microservices/interfaces/serializer.interface";
import {Deserializer} from "@nestjs/microservices/interfaces/deserializer.interface";
import {AmqpModule} from "../amqp.module";

@Module({
    imports: [AmqpModule],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
