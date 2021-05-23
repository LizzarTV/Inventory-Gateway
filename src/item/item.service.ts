import {Inject, Injectable, Logger} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {Optional} from "../utils/baseTypes.util";

@Injectable()
export class ItemService {
    constructor(
        @Inject('AMQP_SERVICE') private readonly proxy: ClientProxy,
        private readonly config: ConfigService
    ) { }

    async onApplicationBootstrap(): Promise<void> {
        await this.proxy.connect().then(() => Logger.debug('Item Proxy connected...')).catch(err => Logger.error(err));
    }

    public getItems() {
        return this.publishMessage('item-list', {});
    }

    public getItem(id: string) {
        return this.publishMessage('item-single', { id });
    }

    public createItem(title: string) {
        return this.publishMessage('item-create', { title });
    }

    public updateItem(id: string, title: Optional<string>, active: Optional<boolean>) {
        return this.publishMessage('item-update', { id, title, active });
    }

    public deleteItem(id: string) {
        return this.publishMessage('item-delete', { id });
    }

    public restoreItem(id: string) {
        return this.publishMessage('item-restore', { id });
    }

    private publishMessage<T, V>(pattern: string, data: T): Promise<V> {
        return this.proxy.send(pattern, data).toPromise();
    }
}