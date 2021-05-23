import {Module} from "@nestjs/common";
import {AmqpModule} from "../amqp.module";
import {LocationController} from "./location.controller";
import {LocationService} from "./location.service";

@Module({
    imports: [AmqpModule],
    controllers: [LocationController],
    providers: [LocationService],
})
export class LocationModule {}