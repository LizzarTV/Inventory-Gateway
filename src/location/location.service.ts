import {Inject, Injectable, Logger} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {Optional} from "../utils/baseTypes.util";

@Injectable()
export class LocationService {
    constructor(
        @Inject('AMQP_SERVICE') private readonly proxy: ClientProxy,
        private readonly config: ConfigService
    ) { }

    async onApplicationBootstrap(): Promise<void> {
        await this.proxy.connect().then(() => Logger.debug('Location Proxy connected...')).catch(err => Logger.error(err));
    }

    public getLocations() {
        return this.publishMessage('location-list', {});
    }

    public getLocation(id: string) {
        return this.publishMessage('location-single', { id });
    }

    public createLocation(title: string) {
        return this.publishMessage('location-create', { title });
    }

    public updateLocation(id: string, title: Optional<string>, active: Optional<boolean>) {
        return this.publishMessage('location-update', { id, title, active });
    }

    public deleteLocation(id: string) {
        return this.publishMessage('location-delete', { id });
    }

    public restoreLocation(id: string) {
        return this.publishMessage('location-restore', { id });
    }

    private publishMessage<T, V>(pattern: string, data: T): Promise<V> {
        return this.proxy.send(pattern, data).toPromise();
    }
}