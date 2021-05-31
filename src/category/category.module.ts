import {Module} from '@nestjs/common';
import {CategoryController} from "./category.controller";
import {AmqpModule} from "../amqp.module";

@Module({
    imports: [AmqpModule],
    controllers: [CategoryController],
    providers: [],
})
export class CategoryModule {}
