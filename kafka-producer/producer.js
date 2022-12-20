import { Kafka } from 'kafkajs'
import { randomUUID } from 'node:crypto'

const bootstrap = async () => {
    const kafka = new Kafka({
        brokers: ['full-leech-10985-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'ZnVsbC1sZWVjaC0xMDk4NSSLqwo_3rsn-SNVv5IyZjSqeWK61UcpU2OfS_cpsMk',
            password: 'GouNFe_h5N4uZ5yZueOTZCpt3R6mGk-3stX95JD1AVxQu8jwtd8b8aAPf5ph4tT40kfonQ==',
        },
        ssl: true,
    })

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({

        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: 'Nova solicitação de amizade',
                    category: 'social',
                    recipientId: randomUUID()
                })
            }
        ]
    })
    
    await producer.disconnect()
}

bootstrap()
