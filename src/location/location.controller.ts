import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common";
import {LocationService} from "./location.service";
import {Optional} from "../utils/baseTypes.util";

@Controller('locations')
export class LocationController {
    constructor(private readonly service: LocationService) {
    }

    @Get()
    getLocationList(): Promise<unknown> {
        return this.service.getLocations().catch(error => this.onError(error.code, error.message));
    }

    @Get('/:id')
    getLocation(@Param('id') id: string): Promise<unknown> {
        return this.service.getLocation(id).catch(error => this.onError(error.code, error.message));
    }

    @Post()
    createLocation(@Body() body: { title: string }): Promise<unknown> {
        return this.service.createLocation(body.title).catch(error => this.onError(error.code, error.message));
    }

    @Put('/:id')
    updateLocation(@Param('id') id: string, @Body() body: { title: Optional<string>, active: Optional<boolean>}): Promise<unknown> {
        return this.service.updateLocation(id, body.title, body.active).catch(error => this.onError(error.code, error.message));
    }

    @Delete('/:id')
    deleteLocation(@Param('id') id: string): Promise<unknown> {
        return this.service.deleteLocation(id).catch(error => this.onError(error.code, error.message));
    }

    @Put('/:id/restore')
    restoreLocation(@Param('id') id: string): Promise<unknown> {
        return this.service.restoreLocation(id).catch(error => this.onError(error.code, error.message));
    }

    private onError(code: number, message: string): void {
        throw new HttpException(message, code || HttpStatus.INTERNAL_SERVER_ERROR);
    }
}