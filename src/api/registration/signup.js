const router = require("express").Router();
const {generateToken} = require("../../assets/utils/jwtUtils");
const {createNewAccount,createAccountByFirebase} = require("../../services/registration/createNewAccounts");

router.get("/",async (req,res,next)=>{
    next("Error");
    // console.log("req body received with these values ");
    // console.log(req.body);
    // res.send("This url is used for handling something");
});

router.post("/",async (req,res,next)=>{

    createNewAccount(req.body).then(()=>{
        res.send("Your account has been created successfully. Please visit the login page");
    }).catch(err=>{
        next(err);
       // res.json(JSON.stringify(err));
    })

});

router.post("/firebase-credentials",async (req,res,next)=>{
        createAccountByFirebase(req.body).then(data=>{
            const token =   generateToken(JSON.parse(JSON.stringify(data)));

           res.send(JSON.stringify({token,user:data}));

        }).catch(err=>{

            next(err);
        })
});



module.exports = router;