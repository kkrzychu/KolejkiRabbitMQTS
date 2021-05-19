"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const consumer_1 = require("./rabbitMQ/consumer");
callback_api_1.default.connect('amqp://localhost', function (err, conn) {
    if (err != null) {
        console.error(err);
        process.exit(1);
    }
    consumer_1.consumer(conn);
});
