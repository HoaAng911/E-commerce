//Tao file config database
const mongoose = require('mongoose')
const {ENV_VARS}=require('./ENV_VARS')

const ConnectDB = async ()=>{
  try{
      await mongoose.connect(ENV_VARS.MONGO_URL,{
        useNewUrlParser:true,
       useUnifiedTopology:true
      })
      console.log('Kết nối MongoDB thành công')
  }catch(error){
      throw new Error('Lỗi kết nối MongoDB: '+error.message)
  }
}
module.exports ={ConnectDB}