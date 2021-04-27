import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import {isAdmin, isAuth} from '../utils.js';

/* define 3 api 
   1 seed to create product from data.product
   2 sending list of product to frontend
   3 returning detail of product*/

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) =>{
    const products = await Product.find({});
    res.send(products);
 })
);

productRouter.get('/seed',
 expressAsyncHandler(async(req, res) =>{
     await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ products: createdProducts});
})
);
productRouter.get('/:id', expressAsyncHandler(async(req, res) =>{
    const product =await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message:'Product Not Found'})
    }
}));

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) =>{
    const product = new Product({
        name: 'sample'+ Date.now(),
        image:'/images/p1.jpg',
        price: 0,
        category:'sample',
        brand: 'sample brand',
        countInStock: 1,
        rating:0,
        numReviews:0,
        description:'sample descript'
    });
    const createdProduct = await product.save();
    res.send({message:'Product Created', product: createdProduct });
 })
);

productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );
  productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );
export default productRouter;