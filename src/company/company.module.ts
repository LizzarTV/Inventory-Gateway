import {Module} from "@nestjs/common";
import {AmqpModule} from "../amqp.module";
import {CompanyService} from "./company.service";

@Module({
    imports: [AmqpModule],
    controllers: [],
    providers: [CompanyService],
})
export class CompanyModule {}