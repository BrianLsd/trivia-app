import express from 'express';
import {MongoClient} from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config()

const jsonParser = bodyParser.json();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();
const port = 8000;

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
});

app.get('/api/questions', async (req, res) => { // tested with Postman
    const client = new MongoClient(process.env.MONGO_CONNECT);
    await client.connect();

    const db = client.db('trivia');
    const questions = await db.collection('questions').find().toArray();
    const randomQuestionNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const data = [];
    for (let i = randomQuestionNumbers.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [randomQuestionNumbers[i], randomQuestionNumbers[j]] = [randomQuestionNumbers[j], randomQuestionNumbers[i]];
    }

    for (let i of randomQuestionNumbers) {
        data.push(questions[i]);
    }
    res.json({data});
});

app.post('/api/admin/overwrite', jsonParser, async(req, res) => { // overwrite data
    const client = new MongoClient(process.env.MONGO_CONNECT);
    await client.connect();

    const db = client.db('trivia');
    try {
        const deleteResult = await db.collection('questions').deleteMany({});
        const insertResult = await db.collection('questions').insertMany(req.body);
    }
    catch (e) {
        console.log(e);
    }
    res.sendStatus(200);
})

app.listen(port, () => console.log(`Server is running on localhost:${port}`));