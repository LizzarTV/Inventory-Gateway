import {Body, Controller, Delete, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {Optional} from "../utils/baseTypes.util";

@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @Get()
    getCategoryList(): any {
       this.service.getCategories().then(data => {
           Logger.debug(data.body, 'CategoryController');
       })
    }

    @Get('/:id')
    getCategory(@Param('id') id: string): any {
        this.service.getCategory(id).then(data => {
            Logger.debug(data.body, 'CategoryController');
        })
    }

    @Post()
    createCategory(@Body() body: { title: string }): any {
        this.service.createCategory(body.title).then(data => {
            Logger.debug(data.body, 'CategoryController');
        })
    }

    @Put('/:id')
    updateCategory(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): any {
        this.service.updateCategory(id, body.title, body.active).then(data => {
            Logger.debug(data.body, 'CategoryController');
        })
    }

    @Delete('/:id')
    deleteCategory(@Param('id') id: string): any {
        this.service.deleteCategory(id).then(data => {
            Logger.debug(data.body, 'CategoryController');
        })
    }
}