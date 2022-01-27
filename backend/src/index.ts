import { Ice } from 'shared';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import initialData from './initialData.js';

const icecreamScheme = new mongoose.Schema<Ice>({
  allergenics: String,
  categorie: String,
  ingredients: [String],
  name: String,
  nutritionalValue: Number,
  price: Number,
});
const IcecreamModel = mongoose.model<Ice>('Ice', icecreamScheme);
const port = 3000;
const connect = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = await mongod.getUri();
  await mongoose.connect(uri);
  try {
    // init Vanille and Schoko
    await IcecreamModel.insertMany(initialData);
  } catch (err) {
    console.log('catch mongo init', err);
  }
};

connect().catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/addIce', async (req: Request, res: Response) => {
  const ice: Ice = req.body;
  try {
    const isUniqueName = (await IcecreamModel.find({ name: ice.name })).length === 0;
    if (isUniqueName) {
      await IcecreamModel.create(ice);
      res.status(201).end();
    } else {
      res.status(409).end();
    }
  } catch (err) {
    console.log('catch mongo', err);
    res.status(400).end();
  }
});
app.get('/getIce', async (_req: Request, res: Response) => {
  try {
    const result = await IcecreamModel.find().lean();
    res.send(JSON.stringify(result));
  } catch (err) {
    res.status(500).end();
  }
});

app.listen(port, () => console.log(`listening on port ${port}!`));
