import { Schema, model } from "mongoose";


const orders = Schema(
  
  {
    
    client: 
      {
        type: Schema.Types.ObjectId,
        ref: "Clients",
      },
      cartItems: [
        {
            product: { type: Schema.Types.ObjectId,ref:'Products'},
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true },
            color: String,
            image:String,
        }
    ],
    dateOfOrders: Date,
    //should be completed when admin send order
    facture: {
      type: String,
      date: Date,
      text: String,
      link: String
    },
    //should be completed when admin send order
    delivery: {
      type: String,
      dateOfDelivery: Date,
      modeOfDelivery: [String],
      
    },
    //should be completed when admin send order
    paymentType: {
      type: String,
      enum: [ "card"],
      required: true,
      default:"card"
    },
    //should be completed when admin send order
    orderStatus: [
      {
        type: {
          type: String,
          enum: ["ordered", "packed", "shipped", "delivered"],
          default: "ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Orders= model("Orders", orders)
export default Orders;



