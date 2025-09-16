const dotenv = require('dotenv')
dotenv.config()

const ENV_VARS={
  PORT:process.env.PORT||5000,
  MONGO_URL:process.env.MONGO_URL
}

module.exports={ENV_VARS}