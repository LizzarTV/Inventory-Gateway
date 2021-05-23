import {Module} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CategoryController} from "./category.controller";
import {AmqpModule} from "../amqp.module";

@Module({
    imports: [AmqpModule],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
