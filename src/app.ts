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

const parameters: Parameters = {
    server: {
        port: Number(process.env.PORT) || 3000
    },
    mongo: {
        url: 'mongodb://app_newjoiners:AbszOb80XbdlDum94cZp@localhost:27017/new_joiners',
        database: 'new_joiners'
    },
    amqp: {
        url: 'amqps://jmodcbnq:y9TkU5HAx6xp6cHod7Gv1lfUwe0vevIF@woodpecker.rmq.cloudamqp.com/jmodcbnq',
        exchangeName: 'profile-exchange',
        queueName: 'profile-reader-queue',
        queueTopicPattern: 'joiner.profile.new',
        defaultTopic: 'joiner.profile.amend'
    }
};

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

exports = module.exports = configuredApp;
