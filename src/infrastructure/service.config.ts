import {Configuration} from './configuration';
import {Container, injectable} from 'inversify';
import { StatusService } from '../service/api/status.service';
import {TYPES} from '../types';
import {DefaultStatusService} from '../service/implementation/default-status.service';
import {MessageQueueService} from '../service/api/message-queue.service';
import {AmqpMessageQueueService} from '../service/implementation/amqp-message-queue.service';
import {ProfileRepositoryService} from '../service/api/profile-repository.service';
import {PostgresProfileRepositoryService} from '../service/implementation/postgres-profile-repository.service';

@injectable()
export class ServiceConfig implements Configuration {
    public configure(container: Container): void {
        container.bind<MessageQueueService>(TYPES.MessageQueueService).to(AmqpMessageQueueService);
        container.bind<ProfileRepositoryService>(TYPES.ProfileRepositoryService)
            .to(PostgresProfileRepositoryService)
            .inRequestScope();
        container.bind<StatusService>(TYPES.StatusService).to(DefaultStatusService);
    }
}
