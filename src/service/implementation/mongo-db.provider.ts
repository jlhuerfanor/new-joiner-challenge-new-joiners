import {Db, MongoClient} from 'mongodb';
import {inject, injectable, postConstruct} from 'inversify';
import {TYPES} from '../../types';
import {Parameters} from '../../model/parameters';

@injectable()
export class MongoDbProvider {
    private parameters: Parameters;
    private isConnected_ = false;
    private database_: Db | undefined;
    private client_: MongoClient | undefined;

    constructor(
        @inject(TYPES.Parameters) parameters: Parameters
    ) {
        this.parameters = parameters;
        console.log('Constructed!');
    }

    public init(): MongoDbProvider {
        this.connection;
        return this;
    }

    public get database(): Promise<Db | undefined> {
        if(this.isConnected_) {
            return Promise.resolve(this.database_);
        } else {
            const dbPromise = this.connection.then((client) => {
                    this.client_ = client;
                    this.database_ = client?.db(this.parameters.mongo.database);
                    this.isConnected_ = true;
                    return Promise.resolve(this.database_);
                });
            dbPromise.catch((reason) => this.disconnect(reason));

            return dbPromise.then((connection) => connection);
        }
    }

    public get connection(): Promise<MongoClient | undefined> {
        if(this.isConnected_) {
            return Promise.resolve(this.client_);
        } else {
            const connectPromise = MongoClient.connect(this.parameters.mongo.url)
                .then((client) => {
                    console.log('connected to mongo-db!');
                    return client;
                });
            connectPromise.catch((reason) => this.disconnect(reason));
            return connectPromise;
        }
    }

    public disconnect(reason?: any): Promise<void> {
        if(reason) {
            console.log(reason);
        }

        const closingPromise =  (this.client_) ? this.client_.close() : Promise.resolve();
        return closingPromise.finally(() => {
            this.client_ = undefined;
            this.database_ = undefined;
            this.isConnected_ = false;
            console.log('disconnected from mongo-db.');
        })
    }

    public get isConnected(): boolean {
        return this.isConnected_;
    }


}
