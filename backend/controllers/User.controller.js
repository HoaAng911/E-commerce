import User from '../models/User.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY
const UserController = {


  //Tao tai khoan
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body
      //Check email da ton tai chx
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ error: 'Email đã được sử dụng' })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword
      })
      const { password: pwd, ...userWithoutPassword } = newUser._doc
      return res.status(201).json({ message: 'Đăng ký thành công', user: userWithoutPassword })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: 'Sai Email hoặc mật khẩu!' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Sai Email hoặc mật khẩu!' })
      }

      // Loại bỏ password trước khi gửi về client
      const { password: pwd, ...userWithoutPassword } = user._doc

      // Tạo token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' }
      )

      return res.json({
        message: 'Đăng nhập thành công',
        token,
        user: userWithoutPassword
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  ,
  getAllUser: async (req, res) => {
    try {
      const user = await User.find().select('-password')
      return res.status(201).json(user)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password')
      if (!user) {
        return res.status(400).json({ message: 'Không tìm thấy user' })
      }
      return res.status(201).json(user)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },
  updateUserById: async (req, res) => {
    try {
      const { username, password, email } = req.body
      let updateData = { username, password }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        updateData.password = hashedPassword
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        updateData
        , { new: true }
      ).select("-password")


      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy User' })
      }
      return res.json({ message: 'cập nhật thành công', user })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) {
        return res.status(400).json({ message: 'Không tìm thấy user' })
      }
      return res.json({ message: 'đã xóa thành công' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },
  getProfile: async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Không có token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ", error: error.message });
  }
},


}


export default UserController