import {Module} from "@nestjs/common";
import {AmqpModule} from "../amqp.module";
import {TypeService} from "./type.service";
import {TypeController} from "./type.controller";

@Module({
    imports: [AmqpModule],
    controllers: [TypeController],
    providers: [TypeService],
})
export class TypeModule {}