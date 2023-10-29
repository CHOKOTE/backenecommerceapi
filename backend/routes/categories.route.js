import express from 'express'
const router = express.Router();

import { logoValidation } from '../middlewares/validation.js';
import multer, { diskStorage } from 'multer';
import { join } from 'path';
import { getAllCategory, postCategory, getCategory, updateCategory, deleteCategory } from '../controllers/categories.controller.js';

import { postNestedCategory, getNestedCategory, updateNestedCategory, deleteNestedCategory, patchNestedCategory, getAllNestedCategory } from '../controllers/nestedCategories.controller.js';


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







router.get('/get-All-category',getAllCategory )
router.post('/create-category',logoValidation,upload.single('logo'),postCategory )
router.get('/get-category/:id',getCategory )
router.put('/update-category/:id',logoValidation,upload.single('logo'),updateCategory )
router.delete('/delete-category/:id',deleteCategory )
//----------------------------------nestedCategory------------------------------------------------------------------------
router.post('/category/create-nested',logoValidation,upload.single('logo'),postNestedCategory )
router.get('/category/get-nested/:id',getNestedCategory )
router.put('/category/update-nested/:id',logoValidation,upload.single('logo'),updateNestedCategory )
router.delete('/category/delete-nested/:id',deleteNestedCategory )
router.patch('/category/patch-nested/:id',patchNestedCategory )
router.get('/category/get-All-nested',getAllNestedCategory )




export default router;

//export default router;