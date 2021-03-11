import {Db, MongoClient} from 'mongodb';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../types';
import {Parameters} from '../../model/parameters';

@injectable()
export class MongoDbProvider {
    private isConnected_ = false;
    private connection_: Db | undefined;

    constructor(
        @inject(TYPES.Parameters) parameters: Parameters
    ) {
        MongoClient.connect(parameters.mongo.url, (error, result) => {
            if(error) {
                console.log('Error connecting to mongodb');
                throw error;
            } else {
                this.connection_ = result.db(parameters.mongo.database);
                this.isConnected_ = true;
            }
        });
    }

    public get connection(): Db | undefined {
        return this.connection_;
    }

    public get isConnected(): boolean {
        return this.isConnected_;
    }

}
