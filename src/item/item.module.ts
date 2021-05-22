import {HttpModule, Module} from "@nestjs/common";
import {ItemService} from "./item.service";
import {ItemController} from "./item.controller";

@Module({
    imports: [HttpModule],
    controllers: [ItemController],
    providers: [ItemService],
})
export class ItemModule {}