import {HttpService, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class CategoryService {

    private readonly daprPort: number;
    private readonly daprPubSubName: string;
    private readonly daprTopic: string;
    private readonly headersRequest: Headers;

    constructor(private readonly config: ConfigService, private readonly http: HttpService) {
        this.daprPort = config.get<number>('DAPR_HTTP_PORT', 3500);
        this.daprPubSubName = config.get<string>('DAPR_PUBSUB_NAME', 'pubsub');
        this.daprTopic = 'inventory-category';
        //
        this.headersRequest = new Headers();
        this.headersRequest.append('Content-Type', 'application/json');
    }

    /*private subscribe(): void {
        this.http.get(`http://localhost:${this.daprPort}/dapr/subscribe`)
            .toPromise()
            .then(data => console.error(data))
            .catch(error => console.error(error));
    }*/

    private postRequest(pattern: string, data: any): void {
        this.http.post(`http://localhost:${this.daprPort}/v1.0/publish/${this.daprPubSubName}/${this.daprTopic}`, {
            pattern,
            data
        },{ headers: this.headersRequest }).toPromise()
            .then(data => console.error('data', data))
            .catch(error => console.error('error', error));
    }

    public getCategories(): void {
        this.postRequest('category-list', {});
    }

    public getCategory(id: string): void {
        this.postRequest('category-single', { id });
    }

    public createCategory(title: string): void {
        this.postRequest('category-create', { title });
    }
}
