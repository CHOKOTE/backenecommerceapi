import { Schema, model } from 'mongoose';

const produitSchema = Schema({
  product: {
    type: String,
    required: [true,"name of product is required"],
    unique:true

  },
  NestedCategories: {
    type:Schema.Types.ObjectId,
    ref:'NestedCategories',
    require:[true,'this product need category']
 },
 client:[{
   type:Schema.Types.ObjectId,
   favorite:{type:Boolean, default:false},
   ref:'Clients'
  }],
  orders:[{
    type:Schema.Types.ObjectId,
    ref:'Orders'
  }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'Clients'},
  description: {
    type: String,
    required: [true,"this product need a description"],
  },
  price: {
    type: Number,
    required: [true," the price of this product is required and it is more than zero"],
    validate:{
      validator: function(v){
        return v>0;
      } 
    }
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  stock: {
    type: Number,
    required: [true," gived the information about stock"],
    validate:{
      validator: function(v){
        return v>=0;
      } 
    }
  },
  typeProduct: [String],
  bestProduit: Boolean,
  reference: String,
  size:[String],
  picture:[{
    type:String,
    required: [true,"the picture for this product is require"],
  }],
  supplier:[String],
  color:[String]
},{
  timestamps:true
});

export default model('Products', produitSchema);


