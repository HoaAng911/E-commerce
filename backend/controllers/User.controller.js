import User from '../models/User.model.js'

const UserController ={
  //Tao tai khoan
    register:async(req,res)=>{
      try {
        const {username,email,password}=req.body
        //Check email da ton tai chx
        const existingUser = await User.findOne({email})
        if(existingUser){
          return res.status(400).json({error:'Email đã được sử dụng'})
        }
        const user = new User({
          username,
          email,
          password
        })

        await user.save()
        return res.status(201).json({message:'Đăng ký thành công'})
      } catch (error) {
        res.status(500).json({error:error.message})
      }
    },
    login:async(req,res)=>{
      try {
        const {email,password}=req.body
        const user =await User.findOne({email})
        if(!user){
          return res.status(400).json({error:'Email hoặc mật khẩu không tồn tại!'})
        }
        if(user.password!==password){
           return res.status(400).json({error:'Email hoặc mật khẩu không tồn tại!'})
        }
        return res.json({
          message:'Đăng nhập thành công',
          user:{
            id:user._id,
            username:user.username,
            email:user.email
          }
        })

      } catch (error) {
           res.status(500).json({error:error.message})
      }
    },
    getAllUser: async(req,res)=>{
      try {
        const user = await User.find()
        return res.json(user)
      } catch (error) {
         return res.status(500).json({ error: error.message })
      }
    },
    getUserById:async(req,res)=>{
      try {
        const user = await User.findById(req.params.id)
        if(!user){
          return res.status(400).json({message:'Không tìm thấy user'})
        }
        return res.json(user)
      } catch (error) {
          return res.status(500).json({ error: error.message })
      }
    },
    updateUserbyId:async(req,res)=>{
      try {
        const {username,password,email}=req.body
        const user = await User.findByIdAndUpdate(
          req.params.id,{
            username,email,password
          },{new:true}
        )

        if(!user){
          return res.status(404).json({message:'Không tìm thấy User'})
        }
        return res.json({message:'cập nhật thành công',user})
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }
    },
    deleteUserById:async(req,res)=>{
      try {
        const user = await User.findByIdAndDelete(req.params.id)
         if(!user){
          return res.status(400).json({message:'Không tìm thấy user'})
        }
        return res.json({message:'đã xóa thành công'})
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }
    }

}
  

export default UserController