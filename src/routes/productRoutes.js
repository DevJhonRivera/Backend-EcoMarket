import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  getFeaturedProducts,
  getMyProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getSellerStats,
  toggleProductStatus,
} from "../controllers/productController.js";

import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get(
  "/featured",
  getFeaturedProducts
);

router.get(
  "/search",
  searchProducts
);

router.get(
  "/my-products",
  protect,
  getMyProducts
);

router.get(
  "/:id",
  getProductById
);

router.post(
  "/",
  protect,
  createProduct
);

router.put(
  "/:id",
  protect,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  deleteProduct
);
router.get(
  "/seller/stats",
  protect,
  authorize("seller"),
  getSellerStats
);
router.patch(
  "/:id/status",
  protect,
  authorize("seller"),
  toggleProductStatus
);

export default router;