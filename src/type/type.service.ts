import {Inject, Injectable, Logger} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {Optional} from "../utils/baseTypes.util";

@Injectable()
export class TypeService {
    constructor(
        @Inject('AMQP_SERVICE') private readonly proxy: ClientProxy,
        private readonly config: ConfigService
    ) { }

    async onApplicationBootstrap(): Promise<void> {
        await this.proxy.connect().then(() => Logger.debug('Type Proxy connected...')).catch(err => Logger.error(err));
    }

    public getTypes() {
        return this.publishMessage('type-list', {});
    }

    public getType(id: string) {
        return this.publishMessage('type-single', { id });
    }

    public createType(title: string) {
        return this.publishMessage('type-create', { title });
    }

    public updateType(id: string, title: Optional<string>, active: Optional<boolean>) {
        return this.publishMessage('type-update', { id, title, active });
    }

    public deleteType(id: string) {
        return this.publishMessage('type-delete', { id });
    }

    public restoreType(id: string) {
        return this.publishMessage('type-restore', { id });
    }

    private publishMessage<T, V>(pattern: string, data: T): Promise<V> {
        return this.proxy.send(pattern, data).toPromise();
    }
}