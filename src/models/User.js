import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },

    profileImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});

userSchema.methods.comparePassword =
  async function (password) {
    return await bcrypt.compare(
      password,
      this.password
    );
  };

export default model("User", userSchema)