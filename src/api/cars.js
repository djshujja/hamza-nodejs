const router = require("express").Router();
const {fetchAllCars,searchData, AddProducts} = require('../services/carsservices');

router.post('/', async (req, res ) => {
    
})


router.get("/all/:pageno",async (req,res,next)=>{
      fetchAllCars(req.params.pageno).then(data=>{
          res.send(data);
      }).catch(err=>{
          next(err);
      });
});

router.get("/search-car",async (req,res,next)=>{

    searchData(req.query).then(data=>{
        res.send(data);
    }).catch(err=>{

        next(err);
    })
})


module.exports = router;