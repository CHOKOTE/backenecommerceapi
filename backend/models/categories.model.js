
import mongoose from 'mongoose';



const categoriesSchema = mongoose.Schema({
      logo:String,
      category:String,
      nested:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'NestedCategories',
      }],
      // products:[{
      //   type:mongoose.Schema.Types.ObjectId,
      //   ref:'Products'
      // }]
},{
    timestamps:true,
});

export default mongoose.model.Categories || mongoose.model('Categories',categoriesSchema);

//export default model('Categories',categoriesSchema)
