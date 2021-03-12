import {Configuration} from './configuration';
import {Container, injectable} from 'inversify';
import {StatusBusiness} from '../business/status/status.business';
import {TYPES} from '../types';
import {CreateProfileBusiness} from '../business/status/create-profile.business';

@injectable()
export class BusinessConfig implements Configuration{
    public configure(container: Container): void {
        container.bind<StatusBusiness>(TYPES.StatusBusiness).to(StatusBusiness);
        container.bind<CreateProfileBusiness>(TYPES.CreateProfileBusiness).to(CreateProfileBusiness);
    }
}
