export interface Parameters {
    server: {
        port: number
    },
    postgres: {
        host: string,
        port: number,
        database: string,
        username: string,
        password: string
    },
    amqp: {
        url: string,
        exchangeName: string,
        queueName: string,
        defaultTopic: string,
        queueTopicPattern: string
    }
}
