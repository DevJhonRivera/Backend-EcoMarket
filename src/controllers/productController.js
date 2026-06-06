import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      stock,
      location,
      emoji,
      imageUrl,
      featured,
    } = req.body;

    const product = await Product.create({
      title,
      description,
      category,
      price,
      stock,
      location,
      emoji,
      imageUrl,
      featured,
      seller: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
    }).populate(
      "seller",
      "username email city"
    );

    res.status(200).json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    ).populate(
      "seller",
      "username email city"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado.",
      });
    }

    product.views += 1;

    await product.save();

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFeaturedProducts =
  async (req, res) => {
    try {
      const products =
        await Product.find({
          featured: true,
          status: "active",
        })
          .limit(8)
          .populate(
            "seller",
            "username"
          );

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getMyProducts =
  async (req, res) => {
    try {
      const products = await Product.find({
        seller: req.user.id,
      })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        total: products.length,
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const updateProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Producto no encontrado",
        });
      }

      if (
        product.seller.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          success: false,
          message:
            "No autorizado",
        });
      }

      Object.assign(
        product,
        req.body
      );

      await product.save();

      res.status(200).json({
        success: true,
        message:
          "Producto actualizado",
        product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
export const deleteProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Producto no encontrado",
        });
      }

      if (
        product.seller.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          success: false,
          message:
            "No autorizado",
        });
      }

      product.status =
        "inactive";

      await product.save();

      res.status(200).json({
        success: true,
        message:
          "Producto eliminado",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const searchProducts =
  async (req, res) => {
    try {
      const {
        q,
        category,
      } = req.query;

      const filters = {
        status: "active",
      };

      if (q) {
        filters.$or = [
          {
            title: {
              $regex: q,
              $options: "i",
            },
          },
          {
            description: {
              $regex: q,
              $options: "i",
            },
          },
        ];
      }

      if (category) {
        filters.category =
          category;
      }

      const products =
        await Product.find(
          filters
        );

      res.status(200).json({
        success: true,
        total: products.length,
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
export const getSellerStats = async (
  req,
  res
) => {
  try {

    const products =
      await Product.find({
        seller: req.user.id,
        status: "active",
      });

    const totalProducts =
      products.length;

    const lowStock =
      products.filter(
        (p) => p.stock <= 5
      ).length;

    const inventoryValue =
      products.reduce(
        (acc, product) =>
          acc +
          product.price *
          product.stock,
        0
      );

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        lowStock,
        inventoryValue,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const toggleProductStatus =
  async (req, res) => {
    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Producto no encontrado",
        });
      }

      product.status =
        product.status === "active"
          ? "inactive"
          : "active";

      await product.save();

      res.status(200).json({
        success: true,
        status: product.status,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };