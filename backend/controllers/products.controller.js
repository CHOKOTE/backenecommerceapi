import Products from "../models/products.model.js";
import NestedCategory from "../models/nestedCategory.js";
import validateMongoDbId from '../helpers/validateMongoDbId.js';
import slugify from 'slugify';

const postProduct = async (req, res) => {
  console.log(req.body)
  const product  = req.body.product;
  const category = req.body.category;
  const err = validationResult(req);
  if (err.Result && err.Result.errors.length !== 0)
    return res.status(400).json(err);

  try {
    const oldproduct = await Products.findOne({ product:product });
    
    if (oldproduct)
      return res
        .status(401)
        .json({ product: "this product is in the database" });
        const nestedCategory = await NestedCategory.find({nestedName:category});
        //console.log(nestedCategory)
    if(!nestedCategory) res.status(401).json({message:'this nested category do not exit in database'})    
    const newProduct = await Products.create({
      product:req.body.product,
      description:req.body.description,
      price:req.body.price,
      stock:req.body.stock,
      bestProduit: req.body.bestProduit,
      reference:req.body.reference,
      NestedCategories:nestedCategory._id,
      slug:slugify(req.body.slug)
    });
    
     if(newProduct)res.status(201).json(newProduct);
     else res.status(405).json({message:'can not save this product'})
    
  } catch (error) {
    console.log(error);
    res.status(400).json(error)
  }
};


const patchProduct = async (req,res)=>{
  const err = validationResult(req);
  if (err.Result && err.Result.errors.length !== 0)
    return res.status(400).json(err);
  validateMongoDbId(req.params.id)

  try {

     const product = await Products.findById(req.params.id)
     if(!product) res.status(401).json({message:'this product do not exit to database'})
     const patchproduct = await Products.findByIdAndUpdate(product._id,{$addToSet:{
       color:req.body.color,
       typeProduct:req.body.typeProduct,
       size:req.body.size,
       picture: 'public/images/'+req.file.filename,
       supplier:req.body.supplier


    }},{new:true});

    res.status(201).json(patchproduct)
    
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }

}

const getProductBySlug = async(req,res)=>{
     console.log(req.params.product)
    try {
        const product = await Products.findOne({ slug:req.params.slug });
        res.status(201).json(product)
    } catch (error) {
       res.json(error)
    }

}


const getProduct = async (req, res) => {
  validateMongoDbId(req.params.id)
  try {
    const product = await Products.findById(req.params.id)
    if(!product) res.status(401).json({message:'this product do not exit to database'});
    res.status(201).json(product)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }

};

const updateProduct = async (req, res) => {
 validateMongoDbId(req.params.id)
 const err = validationResult(req);
 if (err.Result && err.Result.errors.length !== 0)
   return res.status(400).json(err);
 
  
  try {
    const product = await Products.findById(req.params.id)
    if(!product) res.status(401).json({message:'this product do not exit to database'})
    const updateproduct = await Products.findByIdAndUpdate(product._id,req.body,{new:true},{ runValidators: true })
    res.status(201).json(updateproduct)
  } catch (error) {
     console.log(error)
     res.status(400).json(error)
  }
};

const deleteProduct = async(req, res) => {
  validateMongoDbId(req.params.id)

  try {
    const product = await Products.findById(req.params.id)
    if(!product) res.status(401).json({message:'this product do not exit to database'})
    await Products.findByIdAndDelete(product._id);
    res.status(200).json({message:`the product has been successfully delete`})
  } catch (error) {
     console.log(error)
     res.status(400).json(error)
  }
  
};

const getAllProduct = async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Products.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Products.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
};




export  {
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  patchProduct,
  getProductBySlug,
  getAllProduct

};
