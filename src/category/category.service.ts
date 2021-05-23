import {HttpService, Inject, Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {Optional} from "../utils/baseTypes.util";
import {ClientProxy} from "@nestjs/microservices";
import {Observable} from "rxjs";

@Injectable()
export class CategoryService implements OnApplicationBootstrap {
    constructor(
        @Inject('AMQP_SERVICE') private readonly proxy: ClientProxy,
        private readonly config: ConfigService
    ) { }

    async onApplicationBootstrap(): Promise<void> {
        await this.proxy.connect().then(() => Logger.debug('Proxy connected...')).catch(err => Logger.error(err));
    }

    public getCategories() {
        return this.publishMessage('category-list', {});
    }

    public getCategory(id: string) {
        return this.publishMessage('category-single', { id });
    }

    public createCategory(title: string) {
        return this.publishMessage('category-create', { title });
    }

    public updateCategory(id: string, title: Optional<string>, active: Optional<boolean>) {
        return this.publishMessage('category-update', { id, title, active });
    }

    public deleteCategory(id: string) {
        return this.publishMessage('category-delete', { id });
    }

    private publishMessage<T, V>(pattern: string, data: T): Promise<V> {
        return this.proxy.send(pattern, data).toPromise();
    }
}