import {Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put} from "@nestjs/common";
import {Optional} from "../utils/baseTypes.util";
import {ClientProxy} from "@nestjs/microservices";
import {ItemPatterns} from "../utils/patterns.util";

@Controller('items')
export class ItemController {
    constructor(@Inject('AMQP_SERVICE') private readonly proxy: ClientProxy,) {}

    @Get()
    async getItemList(): Promise<unknown> {
        try {
            const pattern = ItemPatterns.LIST;
            const data = await this.proxy.send(pattern, {}).toPromise();
            return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Get('/:id')
    async getItem(@Param('id') id: string): Promise<unknown> {
        try {
            const pattern = ItemPatterns.SINGLE;
            const data = await this.proxy.send(pattern, { id }).toPromise();
            return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Post()
    async createItem(@Body() body: { title: string }): Promise<unknown> {
        try {
            const pattern = ItemPatterns.CREATE;
            const data = await this.proxy.send(pattern, { title: body.title });
            return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Put('/:id')
    async updateItem(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): Promise<unknown> {
        try {
            const pattern = ItemPatterns.UPDATE;
            const data = await this.proxy.send(pattern, { title: body.title });
            return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Delete('/:id')
    async deleteItem(@Param('id') id: string): Promise<unknown> {
        try {
            const pattern = ItemPatterns.DELETE;
            const data = await this.proxy.send(pattern, { id });
            return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Put('/:id/restore')
    async restoreItem(@Param('id') id: string): Promise<unknown> {
        try {
            const pattern = ItemPatterns.RESTORE;
            const data = await this.proxy.send(pattern, { id });
            return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    private onError(code: number, message: string): void {
        throw new HttpException(message, code || HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private async publishMessage<T, V>(pattern: string, data: T): Promise<V> {
        try {
            const result = await this.proxy.send(pattern, data).toPromise();
            return result;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }
}