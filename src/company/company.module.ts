import {Module} from "@nestjs/common";
import {AmqpModule} from "../amqp.module";
import {CompanyService} from "./company.service";
import {CompanyController} from "./company.controller";

@Module({
    imports: [AmqpModule],
    controllers: [CompanyController],
    providers: [CompanyService],
})
export class CompanyModule {}