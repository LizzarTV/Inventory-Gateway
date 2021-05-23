import {Body, Controller, Delete, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {Optional} from "../utils/baseTypes.util";

@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @Get()
    getCategoryList(): any {
        return this.service.getCategories();
    }

    @Get('/:id')
    getCategory(@Param('id') id: string): any {
        return this.service.getCategory(id);
    }

    @Post()
    createCategory(@Body() body: { title: string }): any {  }

    @Put('/:id')
    updateCategory(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): any {  }

    @Delete('/:id')
    deleteCategory(@Param('id') id: string): any { }
}