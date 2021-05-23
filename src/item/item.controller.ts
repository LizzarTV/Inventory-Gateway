import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {ItemService} from "./item.service";
import {Optional} from "../utils/baseTypes.util";

@Controller('items')
export class ItemController {
    constructor(private readonly service: ItemService) {
    }

    @Get()
    getItemList(): Promise<unknown> {
        return this.service.getItems().catch(error => this.onError(error.code, error.message));
    }

    @Get('/:id')
    getItem(@Param('id') id: string): Promise<unknown> {
        return this.service.getItem(id).catch(error => this.onError(error.code, error.message));
    }

    @Post()
    createItem(@Body() body: { title: string }): Promise<unknown> {
        return this.service.createItem(body.title).catch(error => this.onError(error.code, error.message));
    }

    @Put('/:id')
    updateItem(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): Promise<unknown> {
        return this.service.updateItem(id, body.title, body.active).catch(error => this.onError(error.code, error.message));
    }

    @Delete('/:id')
    deleteItem(@Param('id') id: string): Promise<unknown> {
        return this.service.deleteItem(id).catch(error => this.onError(error.code, error.message));
    }

    @Put('/:id/restore')
    restoreItem(@Param('id') id: string): Promise<unknown> {
        return this.service.restoreItem(id).catch(error => this.onError(error.code, error.message));
    }

    private onError(code: number, message: string): void {
        throw new HttpException(message, code || HttpStatus.INTERNAL_SERVER_ERROR);
    }
}