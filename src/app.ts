import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from "inversify";
import * as bodyParser from "body-parser";
import helmet from 'helmet';
import cors from 'cors';
import { TYPES } from './types';
import { GlobalConfig } from './infrastructure/global.config';
import './controller/status.controller';

const serverPort: number = Number(process.env.PORT) || 3000;
const container = new Container();


container.bind<GlobalConfig>(TYPES.GlobalConfig).to(GlobalConfig);
container.get<GlobalConfig>(TYPES.GlobalConfig)
    .configure(container);

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
    serverPort, '0.0.0.0',() => {
    console.log(`App running on ${serverPort}`);
})

exports = module.exports = configuredApp;
