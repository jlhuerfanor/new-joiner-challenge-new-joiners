import {Configuration} from './configuration';
import {Container, injectable} from 'inversify';
import { StatusService } from '../service/api/status.service';
import {TYPES} from '../types';
import {DefaultStatusService} from '../service/implementation/default-status.service';
import {MessageQueueService} from '../service/api/message-queue.service';
import {AmqpMessageQueueService} from '../service/implementation/amqp-message-queue.service';
import {ProfileRepositoryService} from '../service/api/profile-repository.service';
import {TypeormProfileRepositoryService} from '../service/implementation/typeorm-profile-repository.service';
import {ProfileQueryService} from "../service/api/profile-query.service";
import {TypeormProfileQueryService} from "../service/implementation/typeorm-profile-query.service";

@injectable()
export class ServiceConfig implements Configuration {
    public configure(container: Container): void {
        container.bind<MessageQueueService>(TYPES.MessageQueueService).to(AmqpMessageQueueService);
        container.bind<ProfileRepositoryService>(TYPES.ProfileRepositoryService)
            .to(TypeormProfileRepositoryService);
        container.bind<ProfileQueryService>(TYPES.ProfileQueryService)
            .to(TypeormProfileQueryService);
        container.bind<StatusService>(TYPES.StatusService).to(DefaultStatusService);
    }
}
