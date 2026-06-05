import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
      maxlength: 1000,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Frutas",
        "Verduras",
        "Lacteos",
        "Artesanias",
        "Servicios"
      ],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    emoji: {
      type: String,
      default: "📦",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;