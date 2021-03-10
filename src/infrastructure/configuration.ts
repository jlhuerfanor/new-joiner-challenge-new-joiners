import {Container} from 'inversify';

export interface Configuration {
    configure(container: Container): void;
}
