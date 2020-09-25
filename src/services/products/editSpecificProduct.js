const ProductModel = require("../../models/productModel");

const editSpecificProduct = (id)=>{
   return new Promise((resolve,reject)=>{
    ProductModel.findOne({
        _id:id
    }).then(data=>{
        resolve(data);
    }).catch(err=>{
        reject(err);
    })
   })
}

module.exports = editSpecificProduct;