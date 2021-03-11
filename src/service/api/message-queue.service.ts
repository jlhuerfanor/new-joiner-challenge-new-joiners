export interface MessageQueueService {
    send(message: any, topic?: string): void;
    consume(message: any): void;
}
