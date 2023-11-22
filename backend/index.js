import express from 'express';
import { MONGODB_URL, PORT } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('Welcome');
})

app.post('/books', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: 'Required fields are not found' });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);


    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
})

app.get('/books', async (request, response) => {
    try {

        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });

    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message })
    }
})

app.get('/books/:id', async (request, response) => {
    try {

        const book = await Book.findById(request.params.id);
        return response.status(200).json(book);

    } catch (err) {
        console.log(error.message);
        response.status(500).send({ message: err.message })
    }
})

app.put('/books/:id', async (request, response) => {
    try {

    } catch (err) {
        console.log(err.message);
        response.status(404).send({ message: err.message })
    }
})

mongoose.connect(MONGODB_URL).then(() => {
    console.log('DB Connected');
    app.listen(PORT, () => {
        console.log(`App is listening to PORT : ${PORT}`)
    })
}).catch((err) => {
    console.log(err);
});

