const {app} = require('./app')
const mongoose = require("mongoose");
const PORT = process.env.PORT
const DB = process.env.DATABASE
mongoose
  .connect(DB,{
    maxPoolSize: 50,
    minPoolSize: 10,
  })
  .then(() => {
    console.log("MONGODB connected successfully!👋");
  })
  .catch((error) => console.log(error));

app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`server is running at ${PORT} ..`)
})











