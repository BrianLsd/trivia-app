import express from 'express';
import {MongoClient} from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = 8000;

app.get('/api/questions', async (req, res) => { // tested with Postman
    const client = new MongoClient(process.env.MONGO_CONNECT);
    await client.connect();

    const db = client.db('trivia');
    const collectionNames = await db.listCollections().toArray();
    const randomIndex = Math.floor(Math.random() * collectionNames.length);
    const category = collectionNames[randomIndex].name;
    const data = await db.collection(category).find().toArray();
    res.json({category, data});
});

app.listen(port, () => console.log(`Server is running on localhost:${port}`));