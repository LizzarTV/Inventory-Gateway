import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Logger,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {Optional} from "../utils/baseTypes.util";
import {ClientProxy} from "@nestjs/microservices";
import {CategoryPatterns} from "../utils/patterns.util";

@Controller('categories')
export class CategoryController {
    constructor(
        @Inject('AMQP_SERVICE') private readonly proxy: ClientProxy,
    ) {}

    @Get()
    async getCategoryList(): Promise<unknown> {
        try {
            const pattern = CategoryPatterns.LIST;
            const data = await this.proxy.send(pattern, {}).toPromise();
            return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Get('/:id')
    async getCategory(@Param('id') id: string): Promise<unknown> {
        try {
            const pattern = CategoryPatterns.SINGLE;
            const data = await this.proxy.send(pattern, { id });
            return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Post()
    async createCategory(@Body() body: { title: string }): Promise<unknown> {
        try {
            const pattern = CategoryPatterns.CREATE;
            const data = await this.proxy.send(pattern, { title: body.title }).toPromise();
            return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Put('/:id')
    async updateCategory(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): Promise<unknown> {
        try {
            const pattern = CategoryPatterns.UPDATE;
            const data = await this.proxy.send(pattern, { title: body.title, active: body.active }).toPromise();
            return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Delete('/:id')
    async deleteCategory(@Param('id') id: string): Promise<unknown> {
        try {
             const pattern = CategoryPatterns.DELETE;
             const data = await this.proxy.send(pattern, { id }).toPromise();
             return data;
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Put('/:id/restore')
    async restoreCategory(@Param('id') id: string): Promise<unknown> {
        try {
            const pattern = CategoryPatterns.RESTORE;
            const data = await this.proxy.send(pattern, { id }).toPromise();
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