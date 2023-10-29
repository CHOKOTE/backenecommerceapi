import categories from "../models/categories.model.js";
import NestedCategory from "../models/nestedCategory.js";
import validateMongoDbId from '../helpers/validateMongoDbId.js';

const postCategory = async (req, res) => {
  //const logo = req.file.filename;

  try {
    const oldCategory = await categories.findOne({
      category: req.body.category
    });

    if (oldCategory)
      return res.status(401).json({
        category: `this category is in the database`,
      });

    const newCategory = await categories.create({
      category: req.body.category,
      logo: 'public/images/'+req.file.filename,
    });

    return res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);

    res.status(401).json({ error: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await find().populate(
      "nested"
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


const getCategory = async (req, res) => {
  validateMongoDbId(req.params.id)
  try {
    const category = await categories.findOne({ _id: req.params.id }).populate(
      "nested"
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

const updateCategory = async (req, res) => {
  //const logo = req.file.filename;
  validateMongoDbId(req.params.id)
  try {
    const oldCategory = await categories.findById(req.params.id);

    if (!oldCategory)
      return res
        .status(401)
        .json({ category: "this category is not in the database" });

    const newCategory = await categories.findByIdAndUpdate(
      { _id: oldCategory._id },
      {
        category: req.body.category,
        logo: 'public/images/'+req.file.filename,
      },
      { new: true }
    );
    return res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);

    res.status(401).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  validateMongoDbId(req.params.id)
  const oldCategory = await categories.findById(req.params.id);

  if (!oldCategory)
    return res.status(401).json({
      category: `this category  is not in the database`,
    });

  try {
    for (let nested of oldCategory.nested) {
      await NestedCategory.findByIdAndRemove(nested);
    }
    await categories.findByIdAndRemove(req.params.id);
    res.status(201).json({
      message: `this category  has been successfilly delete`,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

export  {
  postCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategory
};
