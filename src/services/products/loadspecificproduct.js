const ProductModel = require("../../models/productModel");
const {mongoose} = require("../../server/connection");

const loadSpecificProduct = (id)=>{
  return new Promise((resolve,reject)=>{
      ProductModel.findOne({_id:mongoose.Types.ObjectId(id)}).then(data=>{
          resolve(data);

       }).catch(err=>{
           reject(err);

      })
  })
};

module.exports = {
    loadSpecificProduct
}
