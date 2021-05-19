
let num = 1;

export function publisher(connection: any, message: string) {
    connection.createChannel(function (error1: Error, channel: any) {
        if (error1) {
            throw error1;
        }

        let queue = 'personalData';

        channel.assertQueue(queue, {
            durable: false
        });


        channel.sendToQueue(queue, Buffer.from(message));

        console.log(" [" + num + "] message sent");
        
        num++

    });
}
