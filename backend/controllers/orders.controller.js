import Orders from "../models/orders.model.js";
import Product from "../models/products.model.js";
import Client from "../models/clients.model.js";
import dotenv from 'dotenv'
dotenv.config();
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

//console.log(JWT_SECRET)
const createOrder = async (req, res) => {
   
  //console.log(req.body)
  
  try {
    const product = await Product.findOne({product: req.body.product});
    //console.log(product)
    const order = await Orders.create({
      client: req.body.clientId,
      cartItems: [
        {
          poduct: product._id,
          quantity:req.body.quantity,
          price: product.price,
          color: product.color.reduce((a,v) => v == req.body.color ? a=v:a ,""),
          image: product.color.reduce((a,v) => v == req.body.image ? a=v:a ,""),
        },
      ],
      dateOfOrders: new Date(),
    });
    
    const client = await Client.findById(req.body.id);
  
    // client.orders.push(order._id);
    // client.product.push(product._id);
    await Client.findByIdAndUpdate(client._id,{$addToSet:{
      product:product._id,
      order:order._id
    }},{new:true}).then((result) => {
       console.log(result)
    }).catch((err) => {
      console.log(err)
      res.status(404).json(err)
    });
    res.status(200).json(order)
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

const getOrder = (req, res) => {};

const updateOrder = (req, res) => {};

const deleteOrder = (req, res) => {};

export {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
