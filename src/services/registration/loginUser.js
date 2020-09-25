const bcrypt = require("bcrypt");
const AddUserModel = require("../../models/usermodel");
const DealerModel = require("../../models/dealermodel");


const loginInUser = (values)=>{
  return new Promise((resolve,reject)=>{
      AddUserModel.findOne({email:values.email}).then((data)=>{

          if(data){
              //record is present

              DealerModel.findOne({user_id:data._id}).then(dealerData=>{
                 if(dealerData){


                     resolve({
                         "userData":data,
                         "dealer_id":dealerData._id,

                     });

                 }else{
                     resolve({"userData":data,"dealer_id":0})
                 }
              }).catch(err=>{
                  reject(err);
              })



          }else{
              // here no record is present
              reject("Incorrect credentials or Your is account deleted");

          }
      })
  })

};

module.exports = loginInUser;