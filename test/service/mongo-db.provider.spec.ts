import 'reflect-metadata';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import {Parameters} from '../../src/model/parameters';
import {MongoDbProvider} from '../../src/service/implementation/mongo-db.provider';

describe('MongoDbProvider', function () {
    it('connectionSuccess', async function () {
        const parameters: Parameters = {
            mongo: {
                url: process.env.TEST_MONGO_URL || 'mongodb://localhost:27017/new_joiners',
                database: 'new_joiners'
            },
            server: { port: 1 }
        };
        const provider = new MongoDbProvider(parameters);
        try {
            const database = await provider.database;
            const connected = provider.isConnected;
            const databaseIsDefined = !!(database);

            if(connected) {
                provider.connection.then((client) => client?.close());
            }

            expect(connected).to.be.true;
            expect(databaseIsDefined).to.not.be.true;
        } catch (err) {
            console.log('1. Should not be here!!')
            expect(provider.isConnected).to.be.true;
        }
    });

    it('connectionFails', async function () {
        this.timeout(100000);
        const parameters: Parameters = {
            mongo: {
                url: process.env.TEST_MONGO_URL || 'mongodb://localhost:3000/new_joiners',
                database: 'new_joiners'
            },
            server: { port: 1 }
        };
        const provider = new MongoDbProvider(parameters);

        try {
            const database = await provider.database;

            console.log('2. Should not be here!!');
            expect(provider.isConnected).to.be.false;
        } catch (err) {
            expect(provider.isConnected).to.be.false;
        }
    });
});
