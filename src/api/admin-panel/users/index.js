const router = require("express").Router();
const {allUsers,makeAdmin,makeManager,deleteUser} = require("../../../services/users");

router.get("/",async (req,res,next)=>{
    allUsers().then(data=>{
        res.send(data);
    }).catch(err=>{
        next(err);
    });
});

router.get("/:pageno",async (req,res)=>{
    allUsers(parseInt(req.params.pageno)).then(data=>{
        res.send(data);
    }).catch(err=>{
        next(err);
    });
});

router.get("/make-admin/:id",async (req,res,next)=>{
     makeAdmin(req.params.id).then((data)=>{
         res.send(data);
     }).catch(err=>{
         next(err);
     });
})

router.get("/make-manager/:id",async (req,res,next)=>{
    makeManager(req.params.id).then((data)=>{
        res.send(data);
    }).catch(err=>{
        next(err);
    });
})

router.get("/delete/:id",async (req,res,next)=>{
        deleteUser(req.params.id).then(()=>{
            res.send("User deleted Successfully");
        }).catch(err=>{
            next(err);
        })
})

module.exports = router;