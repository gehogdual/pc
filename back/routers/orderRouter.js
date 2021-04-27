import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

/*400 client error */
/*created a api /api/order as http post method and be import to server.js */
/*isAdmin make sure only admin can access router */
/*populate get the id of user and load it to the table */
const orderRouter = express.Router();
orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) =>{
    const orders = await Order.find({}).populate('user','name');
    res.send(orders);
  })
);
orderRouter.post('/', 

isAuth,
expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({message: 'Cart is empty'});
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            itemsPrice: req.body.itemsPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201).send({message: 'New Order Created', order: createdOrder})
    }
})
);
/*APi to get order */
orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        res.send(order);
    } else {
        res.status(404).send({message:'Order Not Found'})
    }
})
);

export default orderRouter