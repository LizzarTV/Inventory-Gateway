import {Inject, Injectable, Logger, OnApplicationBootstrap, HttpException, HttpStatus} from '@nestjs/common';
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
        await this.proxy.connect().then(() => Logger.debug('Category Proxy connected...')).catch(err => Logger.error(err));
    }

    public async getCategories() {
        try {
             return await this.publishMessage('category-list', {});
        } catch (error) {
            this.onError(error.code, error.message);
        }
    }

    public async getCategory(id: string) {
        try {
            return await this.publishMessage('category-single', { id });
        } catch (error) {
            this.onError(error.code, error.message);
        }
        
    }

    public async createCategory(title: string) {
        try {
            return await this.publishMessage('category-create', { title });
        } catch (error) {
            this.onError(error.code, error.message);
        }
        
    }

    public async updateCategory(id: string, title: Optional<string>, active: Optional<boolean>) {
        try {
            return await this.publishMessage('category-update', { id, title, active });
        } catch (error) {
            this.onError(error.code, error.message);
        }
        
    }

    public async deleteCategory(id: string) {
        try {
            return await this.publishMessage('category-delete', { id });
        } catch (error) {
            this.onError(error.code, error.message);
        }
        
    }

    public async restoreCategory(id: string) {
        try {
            return await this.publishMessage('category-restore', { id });
        } catch (error) {
            this.onError(error.code, error.message);
        }
        
    }

    private async publishMessage<T, V>(pattern: string, data: T): Promise<V> {
        try {
            return await this.proxy.send(pattern, data).toPromise();
        } catch (error) {
            this.onError(error.code, error.message);
        }
        
    }

    private onError(code: number, message: string): void {
        throw new HttpException(message, code);
    }
}