import {Body, Controller, Delete, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {Optional} from "../utils/baseTypes.util";

@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @Get()
    getCategoryList(): any {
       this.service.getCategories().then(data => {
           Logger.debug(data, 'CategoryController');
       })
    }

    @Get('/:id')
    getCategory(@Param('id') id: string): any {
        const data = this.service.getCategory(id);
    }

    @Post()
    createCategory(@Body() body: { title: string }): any {
        return this.service.createCategory(body.title);
    }

    @Put('/:id')
    updateCategory(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): any {
        return this.service.updateCategory(id, body.title, body.active);
    }

    @Delete('/:id')
    deleteCategory(@Param('id') id: string): any {
        return this.service.deleteCategory(id);
    }
}