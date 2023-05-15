// const checkUser = (req,res,next)=>{
//     // get JWT token from 'jwt' cookie
//     const token = req.cookies.jwt;
//     if(token){
//        // verify JWT token
//       jwt.verify(jwt,'shaheem',(err,decoded)=>{
//         if(err){
//           return res.status(401).json({ message: 'Invalid or expired token' });
//         }else{
//           req.user = decoded;
//           next();
//         }
//       })
//     }else{
//       return res.status(401).json({ message: 'No token provided' });
//     }
//   }

//   module.exports = checkUser