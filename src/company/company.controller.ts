import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {CompanyService} from "./company.service";
import {Optional} from "../utils/baseTypes.util";

@Controller('companies')
export class CompanyController {
    constructor(private readonly service: CompanyService) {
    }

    @Get()
    getCompanyList(): Promise<unknown> {
        return this.service.getCompanys().catch(error => this.onError(error.code, error.message));
    }

    @Get('/:id')
    getCompany(@Param('id') id: string): Promise<unknown> {
        return this.service.getCompany(id).catch(error => this.onError(error.code, error.message));
    }

    @Post()
    createCompany(@Body() body: { title: string }): Promise<unknown> {
        return this.service.createCompany(body.title).catch(error => this.onError(error.code, error.message));
    }

    @Put('/:id')
    updateCompany(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): Promise<unknown> {
        return this.service.updateCompany(id, body.title, body.active).catch(error => this.onError(error.code, error.message));
    }

    @Delete('/:id')
    deleteCompany(@Param('id') id: string): Promise<unknown> {
        return this.service.deleteCompany(id).catch(error => this.onError(error.code, error.message));
    }

    @Put('/:id/restore')
    restoreCompany(@Param('id') id: string): Promise<unknown> {
        return this.service.restoreCompany(id).catch(error => this.onError(error.code, error.message));
    }

    private onError(code: number, message: string): void {
        throw new HttpException(message, code || HttpStatus.INTERNAL_SERVER_ERROR);
    }
}