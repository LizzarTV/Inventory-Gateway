import {HttpService, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {Optional} from "../utils/baseTypes.util";

@Injectable()
export class ItemService {

    private readonly daprPort: number;
    private readonly daprPubSubName: string;
    private readonly daprTopic: string;

    constructor(private readonly config: ConfigService, private readonly http: HttpService) {
        this.daprPort = config.get<number>('DAPR_HTTP_PORT', 3500);
        this.daprPubSubName = config.get<string>('DAPR_PUBSUB_NAME', 'pubsub');
        this.daprTopic = 'inventory-item';
    }

    private postRequest(pattern: string, data: any): Promise<any> {
        return this.http.post(`http://localhost:${this.daprPort}/v1.0/publish/${this.daprPubSubName}/${this.daprTopic}`, {
            pattern,
            data
        }).toPromise()
    }

    public getItems(): Promise<any> {
        return this.postRequest('item-list', {});
    }

    public getItem(id: string): Promise<any> {
        return this.postRequest('item-single', { id });
    }

    public createItem(title: string): Promise<any> {
        return this.postRequest('item-create', { title });
    }

    public updateCategory(id: string, title: Optional<string>, active: Optional<boolean>): Promise<any> {
        return this.postRequest('item-update', { id, title, active });
    }

    public deleteItem(id: string): Promise<any> {
        return this.postRequest('item-delete', { id });
    }

}