import {Module} from "@nestjs/common";
import {ItemService} from "./item.service";
import {ItemController} from "./item.controller";
import {AmqpModule} from "../amqp.module";

@Module({
    imports: [AmqpModule],
    controllers: [ItemController],
    providers: [ItemService],
})
export class ItemModule {}