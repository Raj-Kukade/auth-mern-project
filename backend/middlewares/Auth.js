import jwt from 'jsonwebtoken'

const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];

    if(!auth){
        return res.status(403).json({message:"Unauthorized,JWT token is require"})
    }

    try {

         const decoded = jwt.verify(auth, process.env.JWT_SECRET);
         req.user = decoded;
         next();

    } catch (error) {
         return res.status(403).json({message:"Unauthorized,JWT expired"})
    }
}
export default ensureAuthenticated;

// is like a protected route