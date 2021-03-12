import {Configuration} from './configuration';
import {Container, injectable} from 'inversify';
import {ServiceConfig} from './service.config';
import {BusinessConfig} from './business.config';
import {TYPES} from '../types';
import {PersistenceConfig} from './persistence.config';

@injectable()
export class GlobalConfig implements Configuration {
    public configure(container: Container): void {
        GlobalConfig.bindModules(container);

        container.get<PersistenceConfig>(TYPES.PersistenceConfig).configure(container);
        container.get<ServiceConfig>(TYPES.ServiceConfig).configure(container);
        container.get<BusinessConfig>(TYPES.BusinessConfig).configure(container);
    }

    private static bindModules(container: Container) {
        container.bind<PersistenceConfig>(TYPES.PersistenceConfig).to(PersistenceConfig);
        container.bind<ServiceConfig>(TYPES.ServiceConfig).to(ServiceConfig);
        container.bind<BusinessConfig>(TYPES.BusinessConfig).to(BusinessConfig);
    }
}
