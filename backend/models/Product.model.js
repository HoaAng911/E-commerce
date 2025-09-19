import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    min: 0
  },
  sizes: {
    type: [String],
    default: []
  },
  colors: {
    type: [String],
    default: []
  },
  stock: {
    type: Number,
    default: 0
  },
  images: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    default: ""
  },
  bestseller: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
}

)

export default mongoose.model('Product', ProductSchema)