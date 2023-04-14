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

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../build')))

const validateApiKey = (req, res, next) => { // API key: $2y$10$aXjoDQFYRdVbQeyyZz9yGejIalB9wePmPzHuODl6N5pGY2HSL7wA2 (for testing purposes)
    const apiKey = req.header('x-api-key');
    if (apiKey !== process.env.API_KEY){
        return res.status(401).json({message: 'Invalid API key'});
    }
    next(); // if the API key is OK, proceed
}

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
});

app.get('/api/questions', async (req, res) => { // tested with Postman
    const client = new MongoClient(process.env.MONGO_CONNECT);
    await client.connect();

    const db = client.db('trivia');
    const questions = await db.collection('questions').find().toArray();
    const data = [];
    for (let i = questions.length - 1; i > 0; i--){ // shuffle questions
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    for (let i = 0; i < 10; i++) {
        data.push(questions[i]);
    }
    res.json({data});
});

app.post('/api/admin/overwrite', validateApiKey, jsonParser, async(req, res) => { // overwrite data
    const client = new MongoClient(process.env.MONGO_CONNECT);
    await client.connect();

    const db = client.db('trivia');
    try {
        const deleteResult = await db.collection('questions').deleteMany({});
        const insertResult = await db.collection('questions').insertMany(req.body);
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    
})

app.post('/api/admin/add', validateApiKey, jsonParser, async(req, res) => {
    const client = new MongoClient(process.env.MONGO_CONNECT);
    await client.connect();

    const db = client.db('trivia');
    try {
        const insertResult = await db.collection('questions').insertMany(req.body);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

app.listen(port, () => console.log(`Server is running on localhost:${port}`));