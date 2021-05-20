import {HttpService, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class CategoryService {

    private readonly daprPort: number;
    private readonly daprPubSubName: string;
    private readonly daprTopic: string;

    constructor(private readonly config: ConfigService, private readonly http: HttpService) {
        this.daprPort = config.get<number>('DAPR_HTTP_PORT', 3500);
        this.daprPubSubName = config.get<string>('DAPR_PUBSUB_NAME', 'pubsub');
        this.daprTopic = config.get<string>('DAPR_TOPIC', 'categories');
        this.subscribe();
    }

    private subscribe(): void {
        this.http.get(`http://localhost:${this.daprPort}/dapr/subscribe`)
            .toPromise()
            .then(data => console.error(data))
            .catch(error => console.error(error));
    }

    public getCategories(): void {
        this.http.post(`http://localhost:${this.daprPort}/v1.0/publish/${this.daprPubSubName}/${this.daprTopic}`, {
            "pattern": "category-list",
            "data": {}
        }).toPromise()
            .then(data => console.error(data))
            .catch(error => console.error(error));
    }

    public getCategory(id: string): void {
        this.http.post(`http://localhost:${this.daprPort}/v1.0/publish/${this.daprPubSubName}/${this.daprTopic}`, {
            "pattern": "category-list",
            "data": { id }
        }).toPromise()
            .then(data => console.error(data))
            .catch(error => console.error(error));
    }
}
