import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {TypeService} from "./type.service";
import {Optional} from "../utils/baseTypes.util";

@Controller('types')
export class TypeController {
    constructor(private readonly service: TypeService) {
    }

    @Get()
    getTypeList(): Promise<unknown> {
        return this.service.getTypes().catch(error => this.onError(error.code, error.message));
    }

    @Get('/:id')
    getType(@Param('id') id: string): Promise<unknown> {
        return this.service.getType(id).catch(error => this.onError(error.code, error.message));
    }

    @Post()
    createType(@Body() body: { title: string }): Promise<unknown> {
        return this.service.createType(body.title).catch(error => this.onError(error.code, error.message));
    }

    @Put('/:id')
    updateType(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): Promise<unknown> {
        return this.service.updateType(id, body.title, body.active).catch(error => this.onError(error.code, error.message));
    }

    @Delete('/:id')
    deleteType(@Param('id') id: string): Promise<unknown> {
        return this.service.deleteType(id).catch(error => this.onError(error.code, error.message));
    }

    @Put('/:id/restore')
    restoreType(@Param('id') id: string): Promise<unknown> {
        return this.service.restoreType(id).catch(error => this.onError(error.code, error.message));
    }

    private onError(code: number, message: string): void {
        throw new HttpException(message, code || HttpStatus.INTERNAL_SERVER_ERROR);
    }
}