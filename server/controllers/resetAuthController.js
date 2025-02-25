const noteUser = require("./../models/userModel")
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
require('dotenv').config()

async function verify(token){
  try{
const user = await noteUser.findOne({
  resetToken: token,
 resetTokenExpiry: { $gt: Date.now() }, // Ensure token is not expired
});

if (!user) return false
return true
  }catch{
    return false
  }

}

exports.forgotPassword = async(req,res,next)=>{
    const {email}= req.body
    try {
        const user = await noteUser.findOne({ email });
        if(user){
        const resetToken = (Math.random() + 1).toString(36).substring(2);
        // const hashedToken = await  bcrypt.hash(resetToken,10);

        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        console.log(user.resetTokenExpiry)
         await user.save({validateBeforeSave:false});
         
        const resetLink = `http://localhost:5173/resetPassword/${resetToken}`;
    
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
          secure:true
        });
    
        const mailOptions = {
          from: 'no-reply@yourdomain.com',
          to: email,
          subject: 'Password Reset',
          html: `<p>You requested a password reset.</p>
                 <p>Click this <a href="${resetLink}">link</a> to reset your password.</p>`,
        };
    
        await transporter.sendMail(mailOptions);
      }
        res.status(200).json({ message: 'If an account with this email exists, a password reset link has been sent.' });
      } catch (error) {
        res.status(200).json({ message: 'If an account with this email exists, a password reset link has been sent.' });
        console.log(error)
      }
    
}

exports.verifyToken=async(req,res,next)=>{
  const { token } = req.params;
  try{
const isUserExist= await verify(token)
 if (!isUserExist) return res.status(400).json({ message: 'Invalid or expired token' });
 res.status(200).json({ valid:isUserExist });
} catch (error) {
  res.status(500).json({ message: 'Server error', error: error.message });
  console.log(error)
}
}

exports.resetPassword = async(req,res,next)=>{
  const { token } = req.params;
  const { newPassword } = req.body;
  const {confirmPassword}=req.body
  try {
    const isUserExist= verify(token)
    if (!isUserExist) return res.status(400).json({ message: 'Invalid or expired token' });
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    user.password = newPassword;
    user.confirmPassword= confirmPassword 

    await user.save();
    console.log(user)
    res.status(200).json({ message: 'Password reset successfully' });
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    console.log(error)
  }
}                                                                             