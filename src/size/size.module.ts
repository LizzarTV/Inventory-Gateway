import {Module} from "@nestjs/common";
import {AmqpModule} from "../amqp.module";
import {SizeService} from "./size.service";
import {SizeController} from "./size.controller";

@Module({
    imports: [AmqpModule],
    controllers: [SizeController],
    providers: [SizeService],
})
export class SizeModule {}