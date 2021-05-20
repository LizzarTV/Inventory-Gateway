import {HttpModule, Module} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CategoryController} from "./category.controller";

@Module({
    imports: [HttpModule],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
