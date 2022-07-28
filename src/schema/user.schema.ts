import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", UserSchema);
