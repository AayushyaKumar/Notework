require("dotenv").config()
const qs = require('qs')
const axios = require('axios');
const noteUser = require("../models/userModel");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;
const jwt = require('jsonwebtoken')
//  const {cacheUserProfileImage} = require('../utils/imageURL')
const {joinedDate}= require('../utils/joinDate')
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

  const cookie = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES*60*60*24*1000
    ),
 
   httpOnly: true,
    secure: true,
    sameSite: 'lax', 
    path: '/'

  }


exports.authGoogle=async(req, res) => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      scope: 'email profile',
    })}`;
  
    res.redirect(googleAuthUrl);
  };
  
  exports.authorize=async (req, res) => {
    const {code} = req.query;
  
    // Exchange the code for tokens
    try {
      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        qs.stringify({
          code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
        }),
  
        {
          // body:'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
  
      const accessToken = tokenResponse.data.access_token;
      
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      //  method:'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

  const {id,name,given_name,email,picture}=userInfoResponse.data

      const isUserExist= await noteUser.findOne({email})
      //  await cacheUserProfileImage(picture,name)

      if(isUserExist===null){
        
        const newUser=await noteUser.create({name,email,profilePicture:picture,isOauthUser:true,joinedDate})
        
        await newUser.save()
       
        const token = signToken(newUser._id);
        // res.cookie('JWT',token,cookie)
        // res.cookie('name',name,cookie)
        res.cookie('JWT',token,cookie)
      }else{
        const token= signToken(isUserExist._id)
        console.log(token)
        res.cookie('JWT',token,cookie)
        // res.cookie('name',name,cookie)
 
      }
      res.redirect(`${FRONTEND_URL}`)


    } catch ({name,message}) {
      res.status(500).json({
        error:name,
        message
      });
    }
  }

