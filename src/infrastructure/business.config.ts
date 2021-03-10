import {Configuration} from './configuration';
import {Container, injectable} from 'inversify';
import {StatusBusiness} from '../business/status/status.business';
import {TYPES} from '../types';

@injectable()
export class BusinessConfig implements Configuration{
    public configure(container: Container): void {
        container.bind<StatusBusiness>(TYPES.StatusBusiness).to(StatusBusiness);
    }
}
