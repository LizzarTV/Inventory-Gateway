import {Module} from "@nestjs/common";
import {ItemController} from "./item.controller";
import {AmqpModule} from "../amqp.module";

@Module({
    imports: [AmqpModule],
    controllers: [ItemController],
    providers: [],
})
export class ItemModule {}