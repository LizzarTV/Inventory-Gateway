import {Module} from "@nestjs/common";
import {AmqpModule} from "../amqp.module";
import {SizeService} from "./size.service";

@Module({
    imports: [AmqpModule],
    controllers: [],
    providers: [SizeService],
})
export class SizeModule {}