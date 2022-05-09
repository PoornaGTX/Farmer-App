const Product = require("../modal/Products");
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ msg: products });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const { id: pid } = req.params;
    const products = await Product.findOne({
      _id: pid,
    });
    res.status(200).send({ msg: products });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
};
const deleteProduct = async (req, res) => {
  const { id: pid } = req.params;
  try {
    const products = await Product.findOneAndDelete({
      _id: pid,
    });
    res.status(200).send({ msg: products });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
};
const updateProduct = async (req, res) => {
  const { id: pid } = req.params;
  try {
    const products = await Product.findOneAndUpdate({ _id: pid }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({ msg: products });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
};
const createProduct = async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(200).send({ msg: products });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
