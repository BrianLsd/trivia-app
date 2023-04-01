import express from 'express';
import {MongoClient} from 'mongodb';

const app = express();
const port = 8000;

app.listen(port, () => console.log(`Server is running on localhost:${port}`));

app.get('/api/questions', async (req, res) => {
    const client = new MongoClient(process.env.MONGO_CONNECT);
    await client.connect();

    const db = client.db('trivia');
})