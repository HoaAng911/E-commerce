const express = require('express')
const {ENV_VARS} = require('./config/ENV_VARS')
const{ConnectDB}=require('./config/db')
const app =express()



app.listen(ENV_VARS.PORT || 5000, async () => {
    try {
      await ConnectDB()
        console.log(`Server đang chạy trên http://localhost:${ENV_VARS.PORT || 5000}`);
    } catch (error) {
         console.error("DB connection failed:", err.message);
          process.exit(1);
    }
});