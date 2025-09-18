import Cart from '../models/Cart.model.js'
import Product from '../models/Product.model.js'

const CartController = {
  //Lay gio hang cua user
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId")
      if (!cart) {
        return res.status(200).json({ items: [] })
      }
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body
      let cart = await Cart.findOne({ userId: req.user.id })
      if (quantity <= 0) {
        return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
      }
      //neu chua co gio hang tao gio hang moi
      if (!cart) {
        cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] })
      } else {
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity
        } else {
          cart.items.push({ productId, quantity })
        }
      }
      await cart.save()
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
  updateQuantity: async (req, res) => {
    try {
      const { productId, quantity } = req.body
      let cart = await Cart.findOne({ userId: req.user.id })
      if (quantity <= 0) {
        return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
      }
      if (!cart) {
        return res.status(400).json({ message: 'Giỏ hàng không được tìm thấy' })
      }
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId)
      if (itemIndex === -1) {
        return res.status(400).json({ message: 'Sản phẩm không được tìm thấy trong giỏ hàng' })
      }
      cart.items[itemIndex].quantity += quantity
      await cart.save()
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
  removeFromCart: async (req, res) => {
    try {
      const { productId } = req.body
      let cart = await Cart.findOne({ userId: req.user.id })
      if (!cart) {
        return res.status(400).json({ message: 'Giỏ hàng không được tìm thấy' })
      }
      cart.items = cart.items.filter(item => item.productId.toString() !== productId)
      await cart.save()
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
export default CartController