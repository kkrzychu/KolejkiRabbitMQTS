import express, { Application, Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import amqp from 'amqplib/callback_api';
import { publisher } from './rabbitMQ/publisher';

const app: Application = express();

app.use(express.json());

let validation = (req: Request, res: Response, next: NextFunction) => {
    let id = req.body.id;

    if (id >= 100 && id <= 120) {
        next();
    } else {
        res.status(400).send('ID is not valid');
    }
};

app.post('/api/v1/commands/run', validation, (req: Request, res: Response) => {

    let id: number = req.body.id;

    getData(id).then((userData) => {

        let user = JSON.stringify(convert(userData.data));

        amqp.connect('amqp://localhost', function (err, conn) {
            if (err != null) {
                console.error(err);
                process.exit(1);
            }

            publisher(conn, user);
        });

        res.send(user);
    })
});

async function getData(id: number) {

    const response = await fetch(`https://gorest.co.in/public-api/users/${id}`);
    if (response.ok) {
        const json = await response.json();
        return json
    } else {
        console.log("HTTP-Error: " + response.status);
    }

}

export function convert(obj: User) {

    let newUser: NewUser = {
        uuid: uuidv4(),
        name: obj.name,
        email: obj.email,
        login: obj.email.substring(0, obj.email.lastIndexOf("@")),
        status: obj.status
    }

    return newUser;
}

interface User {
    id: number,
    name: string,
    email: string,
    gender: string,
    status: string,
    created_at: string,
    updated_at: string
}

interface NewUser {
    uuid: string,
    name: string,
    email: string,
    login: string,
    status: string
}


app.listen(3000, () => console.log('Server running'))