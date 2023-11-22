import express from 'express';
import { MONGODB_URL, PORT } from "./config.js";
import mongoose from 'mongoose';
import booksRouter from "./routes/booksRouter.js";
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin:'http://localhost3000',
//     method:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }));

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

