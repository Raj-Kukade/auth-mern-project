import UserModel  from '../models/users.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User already exists",
        success: false
      });
    }

    const usermodel = new UserModel({ name, email, password });
    usermodel.password = await bcrypt.hash(password, 10);

    await usermodel.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        id: usermodel._id,   
        name: usermodel.name,
        email: usermodel.email,
        password:usermodel.password
      }
    });
  } 

  catch (err) {
     console.error(err);
     res.status(500).json({
       message: "Error creating user",
       success: false,
       error: err.message
     });
    }
 };


//************************************************************************************** */


export const Login = async(req,res)=>{
   try{
      const{email,password} = req.body;
      
      const user = await UserModel.findOne({email}); // to check if a user entered email exits or not
      if(!user){
        return res.status(401).json({message:"User Not exists",success: false});
      }

      const isPasswordMatch = await bcrypt.compare(password,user.password); // to compare user password with db stored bcrypt password
      if(!isPasswordMatch){
         return res.status(404).json({
            message:"Invalid password" ,
            success:false
         })
      }

      const jwtToken = jwt.sign(
         {email:user.email , id:user._id},
         process.env.JWT_SECRET,
         {expiresIn:'7d'}
      );

     // res.cookie("token", jwtToken, { httpOnly: true, sameSite: "strict" }).send("Logged in ✅");

      return res.status(200).json({
         message:"login successful",
         success:true,
         jwtToken,
         email,
         name:user.name
      })

      
   }
   
   catch(error){
      console.error("Login Error :" , error.message);
         res.status(500).json({
         messsge:"Login error",
         success:false
       });
   }


}

export const Logout = (req,res)=>{
  res.send("logout")
}
