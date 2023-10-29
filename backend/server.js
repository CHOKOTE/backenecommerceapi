import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import userRoute from "./routes/users.route.js";
import categoriesroute from './routes/categories.route.js';
import productsroute from './routes/products.route.js';
import ordersRoute from './routes/orders.route.js';
//import mongoose from "mongoose"
import connectDB from "./config/database.js";
connectDB();
dotenv.config();
const app = express();
const corsOptions = {origin: `http://localhost:${process.env.PORT}`}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));



//categories

app.use('/api',categoriesroute)
//product route
app.use('/api',productsroute)

app.use('/api',ordersRoute)

// users routes
app.use('/api',userRoute)



const port = process.env.PORT


app.listen(port , () => console.log(`The server is  running in port `+port))