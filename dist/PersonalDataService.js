"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const uuid_1 = require("uuid");
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const publisher_1 = require("./rabbitMQ/publisher");
const app = express_1.default();
app.use(express_1.default.json());
let validation = (req, res, next) => {
    let id = req.body.id;
    if (id >= 100 && id <= 120) {
        next();
    }
    else {
        res.status(400).send('ID is not valid');
    }
};
app.post('/api/v1/commands/run', validation, (req, res) => {
    let id = req.body.id;
    getData(id).then((userData) => {
        let user = JSON.stringify(convert(userData.data));
        callback_api_1.default.connect('amqp://localhost', function (err, conn) {
            if (err != null) {
                console.error(err);
                process.exit(1);
            }
            publisher_1.publisher(conn, user);
        });
        res.send(user);
    });
});
function getData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(`https://gorest.co.in/public-api/users/${id}`);
        if (response.ok) {
            const json = yield response.json();
            return json;
        }
        else {
            console.log("HTTP-Error: " + response.status);
        }
    });
}
function convert(obj) {
    let newUser = {
        uuid: uuid_1.v4(),
        name: obj.name,
        email: obj.email,
        login: obj.email.substring(0, obj.email.lastIndexOf("@")),
        status: obj.status
    };
    return newUser;
}
exports.convert = convert;
app.listen(3000, () => console.log('Server running'));
