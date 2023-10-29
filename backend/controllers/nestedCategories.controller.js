import mongoose from "mongoose";
import categories from "../models/categories.model.js";
import NestedCategories from "../models/nestedCategory.js";
import validateMongoDbId from '../helpers/validateMongoDbId.js';

const getAllNestedCategory = async (req, res) => {
  try {
    const category = await NestedCategories.find().populate(
      "product"
    );
    if (!category)
      res.status(400).json({
        message: ` this category is not in database `,
      });
    res.status(200).json(category);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const postNestedCategory = async (req, res) => {
  const logo = req.file.filename;
  const category = req.body.category;
  

  try {
    const oldNestedCategory = await NestedCategories.findOne({
      nestedName: req.body.nestedName,
    });

    if (oldNestedCategory)
      return res
        .status(401)
        .json({ category: "this nestedCategory is in the database" });
    const findCategory = await categories.findOne({ category });

    if (!findCategory)
      return res
        .status(401)
        .json({ category: "this category do not exit in database" });

    const newNestedCategory = await NestedCategories.create({
      nestedName: req.body.nestedName,
      category: findCategory._id,
      logo: logo,
    });

    findCategory.nested.push(newNestedCategory._id);

    return res.status(200).json(newNestedCategory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: error.message });
  }
};

const patchNestedCategory = async (req, res) => {
  validateMongoDbId(req.params.id)
  try {
    const nestedCategories = await NestedCategories.findById(req.params.id);
    const udateCategorie = await categories.findByIdAndUpdate(
      nestedCategories.category,
      {
        $addToSet: { nested: req.params.id },
      },
      { new: true }
    );
    res.status(200).send(udateCategorie);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

const getNestedCategory = async (req, res) => {
  validateMongoDbId(req.params.id)
  
    try {
      const category = await NestedCategories.findOne({ _id: req.params.id }).populate(
        "product",
        "category"
      );
      if (!category)
        res.status(400).json({
          message: ` this category is not in database `,
        });
      res.status(200).json(category);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  
};

const updateNestedCategory = async (req, res) => {
  const logo = req.file.filename;
  validateMongoDbId(req.params.id)

  try {
    const oldNestedCategory = await NestedCategories.findById(req.params.id);

    if (!oldNestedCategory)
      return res
        .status(401)
        .json({ category: "this nestedcategory is not in the database" });

    const updateNestedCategory = await NestedCategories.categories.findByIdAndUpdate(
      { _id: oldNestedCategory._id },
      {
        nestedName: req.body.nestedName,
        logo,
      },
      { new: true }
    );

    return res.status(200).json(updateNestedCategory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: error.message });
  }
};

const deleteNestedCategory = async (req, res) => {
  validateMongoDbId(req.params.id)
  try {

    const oldCategory = await NestedCategories.findById(req.params.id);

    if (!oldCategory)
      return res
        .status(401)
        .json({ category: "this nested category is not in the database" });

        
    await NestedCategories.findByIdAndRemove(req.params.id);
    res
      .status(201)
      .json({message:"this nested category has been successfilly delete"});
  } catch (error) {
     console.log(error)
     res.status(401).json({error:error.message});
  }    
    

};

export  {
  postNestedCategory,
  getNestedCategory,
  updateNestedCategory,
  deleteNestedCategory,
  patchNestedCategory,
  getAllNestedCategory
};
