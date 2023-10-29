import mongoose, { Schema, model } from "mongoose";



const nestedCategories = Schema(
    {
      nestedName:{type:String,unique:true,require:[true,'the name of nest category is required']},
      logo:String,
      category: { type: Schema.Types.ObjectId, ref: 'Categories' },
      products:[{
        type:Schema.Types.ObjectId,
        ref:'Products'
      }]
    },
    
    {
      timestamps: true,
    }
  );
  export default model("NestedCategories", nestedCategories);