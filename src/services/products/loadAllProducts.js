const ProductModel = require("../../models/productModel");

const loadAllProducts = ()=>{
  return new Promise((resolve,reject)=>{
      ProductModel.find({})
      .then((data)=>{
          resolve(data);
      }).catch(err=>{
          reject(err);
      })
  })
}

module.exports =  loadAllProducts;