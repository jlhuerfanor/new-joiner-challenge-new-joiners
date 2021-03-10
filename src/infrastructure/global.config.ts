import {Configuration} from './configuration';
import {Container, inject, injectable} from 'inversify';
import {ServiceConfig} from './serviceConfig';
import {BusinessConfig} from './business.config';
import {TYPES} from '../types';

@injectable()
export class GlobalConfig implements Configuration {
    public configure(container: Container): void {
        GlobalConfig.bindModules(container);

        container.get<ServiceConfig>(TYPES.ServiceConfig).configure(container);
        container.get<BusinessConfig>(TYPES.BusinessConfig).configure(container);
    }

    private static bindModules(container: Container) {
        container.bind<ServiceConfig>(TYPES.ServiceConfig).to(ServiceConfig);
        container.bind<BusinessConfig>(TYPES.BusinessConfig).to(BusinessConfig);
    }
}
