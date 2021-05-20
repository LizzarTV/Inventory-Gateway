import {HttpModule, Module} from '@nestjs/common';
import {CategoryService} from "./category.service";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [CategoryService],
    exports: [],
})
export class CategoryModule {}
