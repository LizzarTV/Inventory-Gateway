import {Inject, Injectable, Logger} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {Optional} from "../utils/baseTypes.util";

@Injectable()
export class CompanyService {
    constructor(
        @Inject('AMQP_SERVICE') private readonly proxy: ClientProxy,
        private readonly config: ConfigService
    ) { }

    async onApplicationBootstrap(): Promise<void> {
        await this.proxy.connect().then(() => Logger.debug('Company Proxy connected...')).catch(err => Logger.error(err));
    }

    public getCompanys() {
        return this.publishMessage('company-list', {});
    }

    public getCompany(id: string) {
        return this.publishMessage('company-single', { id });
    }

    public createCompany(title: string) {
        return this.publishMessage('company-create', { title });
    }

    public updateCompany(id: string, title: Optional<string>, active: Optional<boolean>) {
        return this.publishMessage('company-update', { id, title, active });
    }

    public deleteCompany(id: string) {
        return this.publishMessage('company-delete', { id });
    }

    public restoreCompany(id: string) {
        return this.publishMessage('company-restore', { id });
    }

    private publishMessage<T, V>(pattern: string, data: T): Promise<V> {
        return this.proxy.send(pattern, data).toPromise();
    }
}