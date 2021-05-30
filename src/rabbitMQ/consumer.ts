let num = 1;

export function consumer(connection: any) {
    connection.createChannel(function (error1: Error, channel: any) {
        if (error1) {
            throw error1;
        }

        let queue = 'personalData';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);


        channel.consume(queue, function (msg: any) {
            if (msg != null) {
                console.log("---> Received message [" + num++ + "]");
                console.log(JSON.parse(msg.content));
            }
        }, {
            noAck: true
        });
    });
}