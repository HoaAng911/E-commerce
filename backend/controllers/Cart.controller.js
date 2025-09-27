import Cart from '../models/Cart.model.js'

const CartController = {
  // Lấy giỏ hàng của user
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId")
      if (!cart) {
        return res.status(200).json({ items: [] })
      }
      res.status(200).json({ items: cart.items })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Thêm sản phẩm vào giỏ
  addToCart: async (req, res) => {
    try {
      const { productId, quantity, size } = req.body
      let cart = await Cart.findOne({ userId: req.user.id })

      if (quantity <= 0) {
        return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
      }

      // Nếu chưa có giỏ hàng -> tạo mới
      if (!cart) {
        cart = new Cart({
          userId: req.user.id,
          items: [{ productId, quantity, size }]
        })
      } else {
        // Kiểm tra trùng sản phẩm + size
        const itemIndex = cart.items.findIndex(
          item => item.productId.toString() === productId && item.size === size
        )

        if (itemIndex > -1) {
          // Nếu cùng productId + size thì tăng số lượng
          cart.items[itemIndex].quantity += quantity
        } else {
          // Nếu khác size thì thêm mới
          cart.items.push({ productId, quantity, size })
        }
      }

      await cart.save()
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Cập nhật số lượng
  updateQuantity: async (req, res) => {
    try {
      const { productId, size, quantity } = req.body
      let cart = await Cart.findOne({ userId: req.user.id })

      if (quantity <= 0) {
        return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
      }
      if (!cart) {
        return res.status(400).json({ message: 'Giỏ hàng không được tìm thấy' })
      }

      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId && (size ? item.size === size : true)
      );

      if (itemIndex === -1) {
        return res.status(400).json({ message: 'Sản phẩm không có trong giỏ hàng' })
      }

      cart.items[itemIndex].quantity = quantity
      await cart.save();
      const populatedCart = await cart.populate("items.productId");
      res.status(200).json(populatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Xóa sản phẩm
  removeFromCart: async (req, res) => {
    try {
      const { productId, size } = req.body
      let cart = await Cart.findOne({ userId: req.user.id })
      if (!cart) {
        return res.status(400).json({ message: 'Giỏ hàng không được tìm thấy' })
      }

      cart.items = cart.items.filter(
        item => !(item.productId.toString() === productId && (size ? item.size === size : true))
      );

      await cart.save();
      const populatedCart = await cart.populate("items.productId");
      res.status(200).json(populatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default CartController
