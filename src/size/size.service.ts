import {Inject, Injectable, Logger} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {Optional} from "../utils/baseTypes.util";

@Injectable()
export class SizeService {
    constructor(
        @Inject('AMQP_SERVICE') private readonly proxy: ClientProxy,
        private readonly config: ConfigService
    ) { }

    async onApplicationBootstrap(): Promise<void> {
        await this.proxy.connect().then(() => Logger.debug('Size Proxy connected...')).catch(err => Logger.error(err));
    }

    public getSizes() {
        return this.publishMessage('size-list', {});
    }

    public getSize(id: string) {
        return this.publishMessage('size-single', { id });
    }

    public createSize(title: string) {
        return this.publishMessage('size-create', { title });
    }

    public updateSize(id: string, title: Optional<string>, active: Optional<boolean>) {
        return this.publishMessage('size-update', { id, title, active });
    }

    public deleteSize(id: string) {
        return this.publishMessage('size-delete', { id });
    }

    public restoreSize(id: string) {
        return this.publishMessage('size-restore', { id });
    }

    private publishMessage<T, V>(pattern: string, data: T): Promise<V> {
        return this.proxy.send(pattern, data).toPromise();
    }
}