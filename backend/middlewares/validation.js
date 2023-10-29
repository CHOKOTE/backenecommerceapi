import { check } from "express-validator";
import { validationResult } from "express-validator";


export const signUpValidation = [
       check(['firstname','lastname'],'firstname or lastname is require please').not().isEmpty(),
       check('email', 'please enter a valid mail').isEmail().normalizeEmail({gmail_remove_dots:true}),
       check('password','password is require min length is 6').isLength({min:6}),
       check('image').custom((value,{req})=>{
              if(req.file.mimetype==='image/jpeg' || req.file.mimetype==='image/png' ) return true;
              else return false;
       }).withMessage("Please upload an image type PNG JPEG"),
]

export const createProduct = [
       check(['product','description'],'product or description is require please').not().isEmpty(),
       check(['price','stock'],'price or stock are require please, the value should be most than 0 ').not().isEmpty(),
       
       
]

export const pictureProduct =  [
       
       check('picture').custom((value,{req})=>{
              if(req.file.mimetype==='image/jpeg' || req.file.mimetype==='image/png' ) return true;
              else return false;
       }).withMessage("Please upload an image type PNG JPEG for this product"),
]

export const signInValidation = [
       
       
       check('email', 'please enter a valid mail').isEmail().normalizeEmail({gmail_remove_dots:true}),
       check('password','password is require min length is 6').isLength({min:6}),
      
       
]

export const uploadValidation = [
       check('image').custom((value,{req})=>{
              if(req.file.mimetype==='image/jpeg' || req.file.mimetype==='image/png' ) return true;
              else return false;
        }).withMessage("Please upload an image type PNG JPEG"),
] 

export const logoValidation = [
       check('logo').custom((value,{req})=>{
              if(req.file.mimetype==='image/jpeg' || req.file.mimetype==='image/png' ) return true;
              else return false;
        }).withMessage("Please upload an image type PNG JPEG"),
] 

export function isRequestValidated(req, res, next) {
       const errors = validationResult(req);
       if(errors.array().length > 0){
           return res.status(400).json({ error: errors.array()[0].msg })
       }
       next();
   }


