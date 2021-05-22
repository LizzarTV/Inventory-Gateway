import {Body, Controller, Get, Param} from "@nestjs/common";
import {ItemService} from "./item.service";

@Controller('item')
export class ItemController {
    constructor(private readonly service: ItemService) {
    }

    @Get()
    getItemList(): any {
        return this.service.getItems();
    }

    @Get('/:id')
    getItem(@Param('id') id: string): any {
        return this.service.getItem(id);
    }

    @Post()
    createItem()
    createItem(@Body() body: { title: string }): any {
        return this.service.createItem(body.title);
    }
}