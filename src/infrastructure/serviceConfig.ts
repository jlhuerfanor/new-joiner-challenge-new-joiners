import {Configuration} from './configuration';
import {Container, injectable} from 'inversify';
import { StatusService } from '../service/api/status.service';
import {TYPES} from '../types';
import {DefaultStatusService} from '../service/implementation/default-status.service';

@injectable()
export class ServiceConfig implements Configuration {
    public configure(container: Container): void {
        container.bind<StatusService>(TYPES.StatusService).to(DefaultStatusService);
    }
}
