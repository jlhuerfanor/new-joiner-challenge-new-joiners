export interface Parameters {
    server: {
        port: number
    },
    mongo: {
        url: string,
        database: string
    },
    amqp: {
        url: string,
        exchangeName: string,
        queueName: string,
        defaultTopic: string,
        queueTopicPattern: string
    }
}
