const router = require("express").Router();
const loginUser = require("../../services/registration/loginUser");
const {generateToken,verifyToken} = require("../../assets/utils/jwtUtils");


router.get("/",async (req,res)=>{
   generateToken({username:"ahmed",ali:"test"});

});

router.get("/token-verification",async (req,res,next)=>{

    const token = req.headers.token;
    console.log(req.headers)
   verifyToken(token).then(userData=>{

       res.send(JSON.stringify({
           token,
           user:userData
       }))
   }).catch(err=>{

       next(err);
   })

});

router.post("/",async (req,res,next)=>{


        loginUser(req.body).then(user => {
          const token =   generateToken(JSON.parse(JSON.stringify(user)));
          res.send(JSON.stringify({token,user}));
        }).catch(err => {

            next(err);
        })


});








module.exports = router;