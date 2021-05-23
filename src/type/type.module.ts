import {Module} from "@nestjs/common";
import {AmqpModule} from "../amqp.module";
import {TypeService} from "./type.service";

@Module({
    imports: [AmqpModule],
    controllers: [],
    providers: [TypeService],
})
export class TypeModule {}