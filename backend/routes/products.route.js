
import express from 'express'
const router = express.Router();
import { pictureProduct, createProduct, isRequestValidated } from '../middlewares/validation.js';
import { postProduct, getProductBySlug, updateProduct, deleteProduct, patchProduct, getAllProduct } from '../controllers/products.controller.js';
import multer, { diskStorage } from 'multer';
import { join } from 'path';


const storage = diskStorage({
    destination: function (req, file, cb) {
      cb(null, join(__dirname,'../public/images'))
    },
    filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname
      cb(null, name)
    }
  })

  const fileFilter = (req,file,cb)=>{

    (file.mimetype === 'image/jpeg' || file.mimetype==='image/png') ? cb(null,true) : cb(null,false)
  }
  
  const upload = multer({ storage: storage, fileFilter})

   





router.post('/post-product',createProduct,isRequestValidated,postProduct )
router.get('/get-name-of-product/:slug',getProductBySlug )
router.put('/updated-product/:id',createProduct,isRequestValidated,updateProduct)
router.delete('/delete-product/:id',deleteProduct )
router.patch('/patch-product/:id',pictureProduct, isRequestValidated ,upload.array('picture'),patchProduct)
router.get('/get-all-product',getAllProduct)



export default router;