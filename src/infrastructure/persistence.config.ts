import {Configuration} from './configuration';
import {Container, inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {Repository, getConnection, EntityTarget, createConnections, Connection} from 'typeorm';
import {Profile} from '../model/profile';
import {Parameters} from '../model/parameters';

@injectable()
export class PersistenceConfig implements Configuration {
    private parameters: Parameters;

    constructor(
        @inject(TYPES.Parameters) parameters: Parameters
    ) {
        this.parameters = parameters;
    }

    public configure(container: Container): void {
        this.registerRepository(container, TYPES.ProfileRepository, Profile);
    }

    private registerRepository<T>(container: Container, identifier: symbol, target: EntityTarget<T>): void {
        container.bind<Repository<T>>(identifier)
            .toDynamicValue(() => this.getRepository(target))
            .inRequestScope()
        ;
    }

    private getRepository<T>(target: EntityTarget<T>): Repository<T> {
        return getConnection().getRepository(target)
    }

}
