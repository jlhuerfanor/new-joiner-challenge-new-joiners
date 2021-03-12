import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from "inversify";
import * as bodyParser from "body-parser";
import helmet from 'helmet';
import cors from 'cors';
import { TYPES } from './types';
import { GlobalConfig } from './infrastructure/global.config';
import './controller/status.controller';
import {Parameters} from './model/parameters';
import {MessageQueueService} from './service/api/message-queue.service';
import {Connection, createConnections} from 'typeorm';
import {Profile} from './model/profile';
import {Application} from 'express';

const parameters: Parameters = {
    server: {
        port: Number(process.env.PORT) || 3000
    },
    postgres: {
        host: 'ec2-54-161-239-198.compute-1.amazonaws.com',
        port: 5432,
        username: 'rvfwarqrbocceh',
        password: '8f92023983dded18375282c04299e9d1bff6bdd72a2ce610c28585ff767387ea',
        database: 'd85ivgo3l2gtdr'
    },
    amqp: {
        url: 'amqps://jmodcbnq:y9TkU5HAx6xp6cHod7Gv1lfUwe0vevIF@woodpecker.rmq.cloudamqp.com/jmodcbnq',
        exchangeName: 'profile-exchange',
        queueName: 'profile-reader-queue',
        queueTopicPattern: 'joiner.profile.new',
        defaultTopic: 'joiner.profile.amend'
    }
};

class ApplicationServer {
    public start() {
        this.getConnection()
            .then(() => {
                console.log('Connected to Postgres DB');
                this.startContainer();
            })
            .catch((error) => console.log(error));
    }

    private getConnection(): Promise<Connection[]> {
        return createConnections([{
            name: 'default',
            type: 'postgres',
            host: parameters.postgres.host,
            port: parameters.postgres.port,
            username: parameters.postgres.username,
            password: parameters.postgres.password,
            database: parameters.postgres.database,
            entities: [ Profile ],
            ssl: {
                rejectUnauthorized: false,
            },
            synchronize: true
        }])
    }

    private startContainer(): Application {
        const container = new Container();

        container.bind<Parameters>(TYPES.Parameters).toConstantValue(parameters);
        container.bind<GlobalConfig>(TYPES.GlobalConfig).to(GlobalConfig);

        container.get<GlobalConfig>(TYPES.GlobalConfig).configure(container);
        container.get<MessageQueueService>(TYPES.MessageQueueService);

        const server = new InversifyExpressServer(
            container,
            null,
            { rootPath: '/wap/new-joiners' });

        server.setConfig((app) => {
            // app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
            app.use(cors());
            app.use(helmet())
        });

        const configuredApp = server.build();
        const serve = configuredApp.listen(
            parameters.server.port, '0.0.0.0',() => {
                console.log(`App running on ${parameters.server.port}`);
            })

        return configuredApp;
    }
}

const server = new ApplicationServer();
server.start();
exports = module.exports = server;
