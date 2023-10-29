import mongoose from "mongoose";
import { genSaltSync, hashSync } from 'bcrypt';



const clientSchema = mongoose.Schema({

    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }],

    orders:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Orders'
    }], 
    firstname:{type:String , required:[true,'fistname is required']},
    lastname:{type:String , required:[true,'lastname is required']},
    email:{type:String ,unique:true, required:[true,'email is required']},
    password:{type:String , required:[true,'password is required']},
    phone:String,
    avatar:String,
    sexe:String,
    role:{
       
        type: String,
        enum: ["client", "admin", "supplier"],
        default: "client",
    },
    newLetter:{
        type:Boolean,
        default:true
    },

      postCode: {
        type: String,
        required: true,
        trim: true,
      },
      locality: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100,
      },
      address: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100,
      },
      cityDistrictTown: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        required: true,
      },
      landmark: {
        type: String,
        min: 10,
        max: 100,
      }, 
      alternatePhone: {
        type: String,
      },
      addressType: {
        type: String,
        required: true,
        enum: ["home", "work"],
        required: true,
      }
},
{ 
    timestamps:true
});

                                                                                                                                  
      
    clientSchema.pre('save', function(next) { 
                                                                                                                                         
        if(this.password) {                                                                                                                                                        
            var salt = genSaltSync(10)                                                                                                                                     
            this.password  = hashSync(this.password, salt)
                                                                                                                           
        }                                                                                                                                                                          
        next();                                                                                                                                                                     
    })                    
      
    
                                                                                                                                                               
                       
const Clients = mongoose.model('Clients',clientSchema)



export default Clients





