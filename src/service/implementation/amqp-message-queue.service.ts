import {MessageQueueService} from '../api/message-queue.service';
import * as Amqp from 'amqp-ts';
import {Parameters} from '../../model/parameters';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {Profile} from '../../model/profile';
import {ProfileRepositoryService} from '../api/profile-repository.service';

@injectable()
export class AmqpMessageQueueService implements MessageQueueService {
    private connection: Amqp.Connection;
    private exchange: Amqp.Exchange;
    private queue: Amqp.Queue;
    private parameters: Parameters;
    private profileRepositoryService: ProfileRepositoryService;

    constructor(
        @inject(TYPES.Parameters) params: Parameters,
        @inject(TYPES.ProfileRepositoryService) profileRepositoryService: ProfileRepositoryService
    ) {
        this.parameters = params;
        this.profileRepositoryService = profileRepositoryService;

        this.connection = new Amqp.Connection(params.amqp.url);
        this.exchange = this.connection.declareExchange(params.amqp.exchangeName, 'topic', { durable: true, noCreate: true });
        this.queue = this.connection.declareQueue(params.amqp.queueName, { durable: true, noCreate: true });
        this.queue.bind(this.exchange, params.amqp.queueTopicPattern);
        this.queue.activateConsumer((message) => this.process(message))
            .then(() => console.log('amqp client consumer subscribed!'))
            .catch((error: any) => console.log(error));
        this.connection.completeConfiguration()
            .then(() => console.log('amqp client connected!'))
            .catch((error: any) => console.log(error));
    }

    send(message: any, topic?: string): void {
        const rawMessage = new Amqp.Message(JSON.stringify(message));
        this.exchange.send(rawMessage, topic || this.parameters.amqp.defaultTopic)
    }

    consume(message: any): void {
        const profile: Profile = message;

        this.profileRepositoryService.persist(profile)
            .then((result) => console.log(`Profile persisted in DB. id = ${result.id}`))
            .catch((error) => console.log(error));
    }

    private process(message: Amqp.Message) {
        const content = message.getContent();
        if(content) {
            const value = JSON.parse(JSON.stringify(content));
            this.consume(value);
        } else {
            console.log('nothing received.');
        }
    }
}
