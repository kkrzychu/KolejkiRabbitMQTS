"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = void 0;
let num = 1;
function consumer(connection) {
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        let queue = 'personalData';
        channel.assertQueue(queue, {
            durable: false
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            if (msg != null) {
                console.log("---> Received message [" + num++ + "]");
                console.log(JSON.parse(msg.content));
            }
        }, {
            noAck: true
        });
    });
}
exports.consumer = consumer;
