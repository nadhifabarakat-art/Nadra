import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  name: String,
  sessions: [String],
  oldPrice: Number,
  newPrice: Number,
  type: String,
  isDeleted: { type: Boolean, default: false }, // ✅
});

export const Offer =
  mongoose.models.Offer || mongoose.model("Offer", offerSchema);
