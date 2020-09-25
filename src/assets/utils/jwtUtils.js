const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const generateToken =  (userData)=>{

   const token =  jwt.sign(userData,config.JWT_SECRET,{
        expiresIn: 60 * 60 * 24 * 7  // expires in 24 hours
    })
    return token;


};

const verifyToken = (token)=>{
  return new Promise((resolve,reject)=>{
      jwt.verify(token,config.JWT_SECRET,function (err,userData){
          if(err) reject(err);
               resolve(userData);
      })
  })
}
module.exports = {
    generateToken,
    verifyToken
};