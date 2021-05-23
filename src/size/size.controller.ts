import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {SizeService} from "./size.service";
import {Optional} from "../utils/baseTypes.util";

@Controller('sizes')
export class SizeController {
    constructor(private readonly service: SizeService) {
    }

    @Get()
    getSizeList(): Promise<unknown> {
        return this.service.getSizes().catch(error => this.onError(error.code, error.message));
    }

    @Get('/:id')
    getSize(@Param('id') id: string): Promise<unknown> {
        return this.service.getSize(id).catch(error => this.onError(error.code, error.message));
    }

    @Post()
    createSize(@Body() body: { title: string }): Promise<unknown> {
        return this.service.createSize(body.title).catch(error => this.onError(error.code, error.message));
    }

    @Put('/:id')
    updateSize(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): Promise<unknown> {
        return this.service.updateSize(id, body.title, body.active).catch(error => this.onError(error.code, error.message));
    }

    @Delete('/:id')
    deleteSize(@Param('id') id: string): Promise<unknown> {
        return this.service.deleteSize(id).catch(error => this.onError(error.code, error.message));
    }

    @Put('/:id/restore')
    restoreSize(@Param('id') id: string): Promise<unknown> {
        return this.service.restoreSize(id).catch(error => this.onError(error.code, error.message));
    }

    private onError(code: number, message: string): void {
        throw new HttpException(message, code || HttpStatus.INTERNAL_SERVER_ERROR);
    }
}