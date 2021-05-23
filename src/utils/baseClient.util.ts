const dapr = require('dapr-client');
const dapr_pb = dapr.dapr_pb;
const dapr_grpc = dapr.dapr_grpc;
const common_pb = dapr.common_pb;
const grpc = dapr.grpc;

export class BaseClient {
    private readonly daprPort: number;
    private readonly daprClient;

    constructor(port: number) {
        this.daprPort = port;
        this.daprClient = new dapr_grpc.DaprClient(`localhost:${port}`, grpc.credentials.createInsecure());
    }

    public publishEvent<T,V>(topic: string, pubsub: string, data: T) {
        const event = new dapr_pb.PublishEventRequest();
        event.setTopic(topic);
        event.setPubsubName(pubsub);
        event.setDataContentType('application/json');
        const bufferData = Buffer.from(JSON.stringify(data));
        event.setData(bufferData);
        this.daprClient.publishEvent(event, (err: string, response: V) => {
            if (err) {
                console.error(`Error publishing! ${err}`);
            } else {
                console.error('Published!', response);
            }
        })

    }


}