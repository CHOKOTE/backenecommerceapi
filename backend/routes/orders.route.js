
import express from 'express'
const router = express.Router();

import { createOrder, getOrder, updateOrder, deleteOrder } from '../controllers/orders.controller.js';





router.patch('/post-order',createOrder)
router.get('/get-order',getOrder )
router.put('/update-order',updateOrder )
router.delete('/delete-order',deleteOrder )



export default router;