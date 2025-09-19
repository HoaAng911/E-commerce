import Product from '../models/Product.model.js'

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const product = new Product(req.body)
      const savedProduct = await product.save()
      res.status(201).json({ message: 'Tạo sản phẩm thành công', product: savedProduct })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }

  },
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find()
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
      if (!product) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm' })
      }
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm' })
      }
      res.status(200).json({ message: 'Cập nhật thành công!', product: updatedProduct })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id)
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm' })
      }
      res.status(200).json({ message: 'Đã xóa thành công', product: deletedProduct })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

}
export default ProductController