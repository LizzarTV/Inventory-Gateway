import {Logger, Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {ClientProxyFactory, RmqOptions, Transport} from "@nestjs/microservices";

const amqpService = {
    provide: 'AMQP_SERVICE',
    useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('AMQP_CONNECTION_STRING', 'amqp://localhost:5672/');
        const queue = configService.get<string>('AMQP_QUEUE', 'queue');
        //
        const clientOptions = {
            transport: Transport.RMQ,
            options: {
                urls: [connectionString],
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
};

@Module({
    providers: [amqpService],
    exports: [amqpService]
})
export class AmqpModule {}