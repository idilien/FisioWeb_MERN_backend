import jwt from 'jsonwebtoken';
import PhysioModel from '../models/PhysioModel.js';



const checkAuth = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')
  ){ 
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.physio = await PhysioModel.findById(decoded.id).select("-password -token -confirm");
      // console.log(`Desde Middleware ${req.physio}`);
       return next();
    } catch (error) {
          const e = new Error('Token no válido desde trycacth del middleware');
          return res.status(403).json({msg: e.message});       
      }
    }
    if(!token){
      const error = new Error('Token no válido desde middleware');
      res.status(403).json({msg: error.message})
    }
    
    next();
};

export default checkAuth;