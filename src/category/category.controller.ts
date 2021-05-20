import {Controller, Get, Param} from "@nestjs/common";
import {CategoryService} from "./category.service";

@Controller('categories')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @Get()
    getCategoryList(): void {
        this.service.getCategories();
    }

    @Get('/:id')
    getCategory(@Param('id') id: string): void {
        this.service.getCategory(id);
    }
}