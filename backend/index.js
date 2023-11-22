import express from 'express';
import { MONGODB_URL, PORT } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRouter from "./routes/booksRouter.js";

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('Welcome');
})

app.use('/books', booksRouter)



mongoose.connect(MONGODB_URL).then(() => {
    console.log('DB Connected');
    app.listen(PORT, () => {
        console.log(`App is listening to PORT : ${PORT}`)
    })
}).catch((err) => {
    console.log(err);
});

