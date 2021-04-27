import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
/*don't forget add dotenv file to gitignore so the password not leak*/

/* express installed */
/* set type in package.json to module, then install nodemon package*/
/* return product to backend*/
/* new api for product details*/
/* cunnect to the mongodb, use user router, user model to ssave user inforamtion*/
/* import product router then remove static data*/
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/Pcbuilder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

/*app.get('/api/products/:id', (req, res)=> {
    const product = data.products.find( (x) => x._id === req.params.id);
   if(product){
       res.send(product);
   } else {
       res.status(404).send({message:'Product not Fount'});
   }
});*/

/*app.get('/api/products', (req, res) => {
    res.send(data.products);
});*/
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/', (req, res) => {
    res.send('Server is  ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
