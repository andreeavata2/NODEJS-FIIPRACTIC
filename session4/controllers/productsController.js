const HttpStatusCode = require("http-status-codes");

const getProducts = async (req, res) => {
  try {
    const userId = req.user.userId;

    const products = await req.db.Product.find({
      userId,
    });

    return res.status(HttpStatusCode.OK).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something bad happened!",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const userId = req.user.userId;

    const product = await req.db.Product.create({
      ...req.body,
      userId,
    });

    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something bad happened!",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const {
      mongo: { ObjectId },
    } = require("mongoose");

    const product = await req.db.Product.findOne({
      _id: ObjectId(productId),
    });

    if (!product) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: "product not found!",
      });
    }

    await req.db.Product.updateOne(
      {
        _id: ObjectId(productId),
      },
      req.body
    );

    const newProduct = await req.db.Product.findOne({
      _id: ObjectId(productId),
    });

    return res.status(HttpStatusCode.OK).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something bad happened!",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const {
      mongo: { ObjectId },
    } = require("mongoose");

    const product = await req.db.Product.findOne({
      _id: ObjectId(productId),
    });

    if (!product) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: "product not found!",
      });
    }

    await req.db.Product.deleteOne({
      _id: ObjectId(productId),
    });

    return res.status(HttpStatusCode.NO_CONTENT).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something bad happened!",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
