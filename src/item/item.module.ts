import {HttpModule, Module} from "@nestjs/common";
import {ItemService} from "./item.service";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [ItemService],
})
export class ItemModule {}