const DealerModel = require("../models/dealermodel");
const UserModel  = require("../models/usermodel");
const {mongoose,MongooseSchema}  =require("../server/connection");
const {DealerInfoModel} = require("../models/dealer-general-info");
const AddProductsModel = require("../models/productModel");


const fetchAllCars = (pageno=0)=>{
   return new Promise((resolve,reject)=>{
       AddProductsModel.find({}).skip(pageno * 20).limit(20).then(data=>{
           resolve(data);
       }).catch(err=>{
           reject(err);
       })
   });
};

const searchData = (query)=>{
    return new Promise ((resolve,reject)=>{

        const regexQuery = {
            $or:[
                {name: new RegExp(query.name ? query.name : "//" , 'i')},// if user pass empty string then ignore search of this type
                {car_rental_company_name: new RegExp(query.name ? query.name : "//"   , 'i')},// if user pass empty string then ignore search of this type
                {model: new RegExp(query.model ? query.model : "//"  , 'i')},// if user pass empty string then ignore search of this type
                {location: new RegExp(query.location ? query.location : "//"  , 'i')}, // if user pass empty string then ignore search of this type
             ]}

             AddProductsModel.find(regexQuery).then(data=>{

                 resolve(data);
             }).catch(err=>{

                 reject(err);
             })
    })
}

module.exports = {
    fetchAllCars,
    searchData
}
