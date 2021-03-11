import {Configuration} from './configuration';
import {Container} from 'inversify';
import {MongoDbProvider} from '../service/implementation/mongo-db.provider';
import {TYPES} from '../types';

export class PersistenceConfig implements Configuration {
    public configure(container: Container): void {
        container.bind<MongoDbProvider>(TYPES.MongoDbProvider).to(MongoDbProvider);
    }
}
