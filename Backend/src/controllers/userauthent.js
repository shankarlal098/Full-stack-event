const User = require('../models/userschema');
const validator = require('../utils/valid');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const redis = require('../confi/redis');
const crypto = require("crypto");
const transporter = require('../utils/nodemailer')

const register = async (req , res) => {
   try {
       console.log("A");
      validator(req.body);
       console.log("B");

      const { firstName , emailId , password } = req.body;
      req.body.password = await bcrypt.hash(password , 10); 
 
      console.log("Done1");
      const user = await User.create(req.body); // while creating object if email is same in db i.e if aready exist then it thrwo an error then due to we wrote in scehma that email should be unique so it will thrwo you an error   
      console.log("Done2");
      const token = jwt.sign(
          { _id: user._id , emailId: emailId , firstName: firstName},
         process.env.JWT_KEY,
         { expiresIn: 60 * 60 }  //jwt to time isliye de rha taki redis ke saym payload se expire time nikal sake
      );
     res.cookie('token', token, {
        httpOnly: true,
        secure: true,        // required for HTTPS (Render)
        sameSite: "none",    // 🔥 CRITICAL FOR CROSS DOMAIN
        maxAge: 60 * 60 * 1000
      });
      

       
      const reply = {
         firstName : user.firstName,// check here in Schema the casesensitivity F-->F?? OR f--->F ???
         emailId : user.emailId,
         _id : user._id 
      } 
      res.status(200 ).json({
          user:reply,
          message : "REGISTER Successfully"
      });
   }
   catch(err){
      res.status(400).send("Error : " + err.message);
   }

}
const login = async (req , res) => {
   try{
      const { emailId , password } = req.body;
      if(!emailId)
         throw new Error("Invalid Credentials");
      if(!password) 
         throw new Error("Invalid Credentials");

      const user = await User.findOne({ emailId });

      if(!user)
         throw new Error("Invalid Credentials");
      const Match = await bcrypt.compare(
         password,
         user.password
      );


      if(!Match)
        throw new Error("Invalid Credentials");

      const token = jwt.sign(
         { _id: user._id , emailId: emailId  , firstName : user.firstName},
         process.env.JWT_KEY, 
         { expiresIn: 60 * 60 }
      );

      const reply = {
         firstName : user.firstName,
         emailId : user.emailId,
         _id : user._id 
      }
      res.cookie('token', token, {
          httpOnly: true,
          secure: true,        // required for HTTPS (Render)
          sameSite: "none",    // 🔥 CRITICAL FOR CROSS DOMAIN
          maxAge: 60 * 60 * 1000
        });

      res.status(200).json({
          user:reply,
          message : "Loggin Successfully"
      });

   }
   catch(err){
        res.status(400).send("Invalid Credentials");
   } 
}
const logout = async (req , res) => {
   try{
      const {token} = req.cookies;
      const payload = jwt.decode(token);
      await redis.set(`token:${token}` , 'Blocked');
      await redis.expireAt(`token:${token}`, payload.exp );     
      res.cookie("token","",{expires: new Date(0)});
      res.send("Logged_Out Successfully");
   }
   catch(err){
        res.status(503).send("Error : " + err);
   } 
}
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user =
      await User.findOne({
        emailId: email
      });
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists, a reset link has been sent."
        });
    }

    // Generate raw token
    const resetToken =
      crypto.randomBytes(32).toString("hex");

    const hashedToken =
      crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      console.log("call3"); 


    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires =
     Date.now() + 15 * 60 * 1000; 
     await user.save();
       

    const resetLink =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const response = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.emailId,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset</h2>
        <p>
          You requested a password reset.
        </p>
        <p>
          Click below:
        </p>
        <a href="${resetLink}">
          Reset Password
        </a>
        <p>
          This link expires in 15 minutes.
        </p>
        <p>
          Ignore this email if you didn't request it.
        </p>
      `
    });

    return res.status(200).json({
      success: true,
      message:
        "If an account exists, a reset link has been sent."
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const resetPassword = async (req, res) => {
  try {

    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password required"
      });
    }

    // hash incoming token
    const hashedToken =
      crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        $gt: Date.now() 
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // token becomes single-use
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


module.exports = {register , login , logout ,resetPassword , forgotPassword};

