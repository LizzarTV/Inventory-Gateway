import {Logger, Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {RmqUrl} from "@nestjs/microservices/external/rmq-url.interface";
import {ClientProxyFactory, RmqOptions, Transport} from "@nestjs/microservices";

const amqpService = {
    provide: 'AMQP_SERVICE',
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
        Logger.debug(rmqUrl, 'RMQURL');
        Logger.debug(clientOptions, 'Options');
        //
        return ClientProxyFactory.create(clientOptions)
    },
    inject: [ConfigService]
};

@Module({
    providers: [amqpService],
    exports: [amqpService]
})
export class AmqpModule {}