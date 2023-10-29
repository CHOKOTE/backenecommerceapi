//const router = (require('express')).Router();
import express  from 'express';
import { signUp, signIn, getUser, updateUser, deleteUser } from '../controllers/users.controller.js';
import  isAuth  from '../middlewares/auth.jwt.js';
import { signUpValidation, signInValidation, uploadValidation, isRequestValidated } from '../middlewares/validation.js';
import multer, { diskStorage } from 'multer';
import { join } from 'path';

const router = express.Router();
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

   


// route users controller

router.post('/register', signUpValidation ,isRequestValidated ,upload.single('image') ,signUp)
router.post('/login', signInValidation , isRequestValidated,signIn)
router.get('/get-user', isAuth ,getUser);
//router.post('/user/upload/:id', uploadValidation,isRequestValidated,upload.single('avatar'),userController.upload)
router.put('/user/update/:id', uploadValidation, isRequestValidated,upload.single('avatar'),updateUser)
router.delete('/user/delete/:id',deleteUser)

export default router;