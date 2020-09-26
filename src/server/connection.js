const mongoose = require("mongoose");
const validator = require("validator");

// const uri = "mongodb+srv://testuser:shine123@cluster0-h6gwp.mongodb.net/aerabetidev?retryWrites=true&w=majority";
const uri =
  "mongodb+srv://testapp:shujja@cluster0.lzutz.mongodb.net/CarRental?retryWrites=true&w=majority";
//const uri = "mongodb+srv://testuser:shine123@cluster0-h6gwp.mongodb.net/aerabetipro?retryWrites=true&w=majority";

//mongoose.connect(uri,{useUnifiedTopology:true,useCreateIndex:true,useNewUrlParser:true,useFindAndModify:false});
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connceted to database");
  })
  .catch((err) => {
    console.log("error occur " + err);
  });

module.exports = {
  mongoose,
  validator,
  MongooseSchema: mongoose.Schema,
};
