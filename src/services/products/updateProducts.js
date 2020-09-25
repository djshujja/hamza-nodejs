const AddProductsModel = require("../../models/productModel");

const UpdateProducts = (id,value,imagePath,mutlipleImagePath)=>{
 
    return new Promise((resolve,reject)=>{

     
       AddProductsModel.findOneAndUpdate({
           _id:id,
           
       },{

        name:value.name,
        location:value.location,
        descriptions:value.descriptions,
        model:value.model,


       rental_period:value.rental_period,
       rental_cost:value.rental_cost,
       mileage_limit:value.mileage_limit,
       color_available:value.color_available,
       additional_mileage:value.additional_mileage,
       toll_charge:value.toll_charge,
       excess_claim:value.excess_claim,
       security_deposit:value.security_deposit,
       accepted_in:value.accepted_in,
       pickup_charge:value.pickup_charge,
//    car specification
       specs_description:value.specs_description,
       //car features
       features_description:value.features_description,

       // company_names:[],

       car_type:value.car_type,

       imagePath: imagePath ? imagePath : value.old_image_path,
       multiple_image_path:mutlipleImagePath ? mutlipleImagePath : value.multiple_image_path

        
       }).then(()=>{
           resolve("Update data successfully");
       }).catch(err=>{
           reject(err);
       })
       
    })
}


module.exports = UpdateProducts;