import {Configuration} from './configuration';
import {Container, injectable} from 'inversify';
import { StatusService } from '../service/api/status.service';
import {TYPES} from '../types';
import {DefaultStatusService} from '../service/implementation/default-status.service';
import {MongoDbProvider} from '../service/implementation/mongo-db.provider';
import {MessageQueueService} from '../service/api/message-queue.service';
import {AmqpMessageQueueService} from '../service/implementation/amqp-message-queue.service';

@injectable()
export class ServiceConfig implements Configuration {
    public configure(container: Container): void {
        container.bind<MongoDbProvider>(TYPES.MongoDbProvider)
            .to(MongoDbProvider)
            .onActivation((context, injectable1) => injectable1.init());
        container.bind<MessageQueueService>(TYPES.MessageQueueService).to(AmqpMessageQueueService);

        container.bind<StatusService>(TYPES.StatusService).to(DefaultStatusService);
    }
}
