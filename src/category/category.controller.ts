import {Body, Controller, Delete, Get, HttpException, Logger, Param, Post, Put} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {Optional} from "../utils/baseTypes.util";

@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @Get()
    getCategoryList(): any {
        return this.service.getCategories().catch(error => this.onError(error.code, error.message));
    }

    @Get('/:id')
    getCategory(@Param('id') id: string): any {
        return this.service.getCategory(id).catch(error => this.onError(error.code, error.message));
    }

    @Post()
    createCategory(@Body() body: { title: string }): any {  }

    @Put('/:id')
    updateCategory(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): any {  }

    @Delete('/:id')
    deleteCategory(@Param('id') id: string): any { }

    private onError(code: number, message: string): void {
        throw new HttpException(message, code);
    }
}