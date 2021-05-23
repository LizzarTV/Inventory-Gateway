import {Module} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CategoryController} from "./category.controller";
import {ClientProxyFactory, RmqOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {RmqUrl} from "@nestjs/microservices/external/rmq-url.interface";
import {Serializer} from "@nestjs/microservices/interfaces/serializer.interface";
import {Deserializer} from "@nestjs/microservices/interfaces/deserializer.interface";

@Module({
    controllers: [CategoryController],
    providers: [
        CategoryService,
        {
            provide: 'category_service',
            useFactory: (configService: ConfigService) => {
                const host = configService.get<string>('AMQP_HOST', 'localhost');
                const port = configService.get<number>('AMQP_PORT', 5672);
                const user = configService.get<string>('AMQP_USERNAME', 'guest');
                const password = configService.get<string>('AMQP_PASSWORD', 'guest');
                const queue = configService.get<string>('AMQP_QUEUE', 'queue');
                //
                const rmqUrl = {
                    protocol: 'amqp',
                    hostname: host,
                    port,
                    username: user,
                    password,
                } as RmqUrl;
                const clientOptions = {
                    transport: Transport.RMQ,
                    options: {
                        urls: [rmqUrl],
                        queue,
                        queueOptions: {
                            durable: false
                        },
                        noAck: false,
                    },
                } as RmqOptions;
                //
                return ClientProxyFactory.create(clientOptions)
            },
            inject: [ConfigService]
        }
    ],
})
export class CategoryModule {}
