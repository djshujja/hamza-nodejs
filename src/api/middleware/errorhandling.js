const error = (req,res,next)=>{
   const err = new Error("Not found");
   err.status = 404;
   next(err);
};

const sendError = (err,req,res,next)=>{
    res.status(err.status || 500);

    res.send({
        message:err.message,
        error:err
    })
};

module.exports = {
    error,
    sendError
}