const express = require("express")
const cors = require("cors")
const app = express()
const errorHandler= require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser');
const { rateLimit } = require('express-rate-limit')
const authrouter = require("./routes/userRoutes")
const mlrouter = require("./routes/mlroutes")

require('dotenv').config()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.set('trust proxy', 1);
const limiter = rateLimit({
  max:100,
  windowMs: 2*60*60*1000,
  message: "Too many false requests from the same IP, please try again in an hour"
})

app.use((req,res,next)=>{
    console.log("Middleware said to request: Jane se phle mujhse milke jana")
    next()
})
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(`/${req.method} method`, req.requestTime,req.params)
    next();
  });

// app.use(passport.initialize());
app.use(limiter)
app.use("/ai",mlrouter)
app.use("/auth",authrouter)

app.use(errorHandler);


module.exports =  {app}