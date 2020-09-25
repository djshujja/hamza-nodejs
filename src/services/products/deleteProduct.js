const ProductModel = require("../../models/productModel");
const DealerModel  =require("../../models/dealermodel");
const {mongoose} = require("../../server/connection");
const {deleteMultipleFiles}  = require("../../assets/utils/uploadFiles");

const deleteProduct = (id)=>{
   return new Promise((resolve,reject)=>{
    ProductModel.findByIdAndDelete(id)
    .then((dataId)=>{
        deleteMultipleFiles(dataId.multiple_image_path);
        console.log("delete product");
        console.log(dataId);
        DealerModel.updateOne({_id: mongoose.Types.ObjectId(dataId.car_rental_company_id)},{
            $inc: {total_active: -1,total_deactivated:1},


        }).catch(err=>{
            console.log(err);
        });
           resolve();
    }).catch(err=>{
        reject(err);
    })
   }) 
}

module.exports = deleteProduct;