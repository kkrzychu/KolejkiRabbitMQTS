import amqp from 'amqplib/callback_api';
import { consumer } from './rabbitMQ/consumer';


amqp.connect('amqp://localhost', function (err, conn) {
    if (err != null) {
        console.error(err);
        process.exit(1);
    }
    consumer(conn);
});

 