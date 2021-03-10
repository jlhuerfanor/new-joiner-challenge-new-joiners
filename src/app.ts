import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from "inversify";
import express from 'express';
import * as bodyParser from "body-parser";
import { TYPES } from "./types";
import helmet from 'helmet';
import './controller/status.controller';

let serverPort = 8080;
let container = new Container();

// container.bind<StatusController>(TYPES.StatusController).to(StatusController);
// Configure container here

const app = express();
let server = new InversifyExpressServer(container, null, { rootPath: '/wap/new-joiners' }, app);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json);
    app.use(helmet())
});

let configuredApp = server.build();

let serve = configuredApp.listen(serverPort, '0.0.0.0',() => {
    console.log('boo');
    // @ts-ignore
    console.log(`App running on ${serve.address().port}`);
})

exports = module.exports = app;