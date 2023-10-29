import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Clients', required: true },
    cartItems: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true }
        }
    ]
}, { timestamps: true });


export default model('Cart', cartSchema);