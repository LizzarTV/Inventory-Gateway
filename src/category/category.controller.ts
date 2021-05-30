import {Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {Optional} from "../utils/baseTypes.util";

@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @Get()
    getCategoryList(): Promise<unknown> {
        try {
            return this.service.getCategories().catch(error => this.onError(error.code, error.message));
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Get('/:id')
    getCategory(@Param('id') id: string): Promise<unknown> {
        try {
            return this.service.getCategory(id).catch(error => this.onError(error.code, error.message));
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Post()
    createCategory(@Body() body: { title: string }): Promise<unknown> {
        try {
            return this.service.createCategory(body.title).catch(error => this.onError(error.code, error.message));
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Put('/:id')
    updateCategory(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): Promise<unknown> {
        try {
            return this.service.updateCategory(id, body.title, body.active).catch(error => this.onError(error.code, error.message));
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Delete('/:id')
    deleteCategory(@Param('id') id: string): Promise<unknown> {
        try {
             return this.service.deleteCategory(id).catch(error => this.onError(error.code, error.message));
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    @Put('/:id/restore')
    restoreCategory(@Param('id') id: string): Promise<unknown> {
        try {
            return this.service.restoreCategory(id).catch(error => this.onError(error.code, error.message));
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    private onError(code: number, message: string): void {
        throw new HttpException(message, code || HttpStatus.INTERNAL_SERVER_ERROR);
    }
}