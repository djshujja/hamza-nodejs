const DealerModel = require("../models/dealermodel");
const UserModel  = require("../models/usermodel");
const {mongoose,MongooseSchema}  =require("../server/connection");
const {DealerInfoModel} = require("../models/dealer-general-info");
const AddProductsModel = require("../models/productModel");

const dealer = (value)=>{
    return new Promise((resolve,reject)=>{



        DealerModel.findOne({$and:[{'user_id':mongoose.Types.ObjectId(value.user_id)},{dealer_status:"running"}]}).then(data=>{

            if(!data){
               UserModel.findOne({_id:value.user_id}).then(userData=>{

                        DealerModel({
                                name: userData.full_name,
                                car_rental_company_name: userData.car_rental_company_name,
                                user_id:userData._id,
                                license_no: value.license_no,
                                license_expiration_date: value.license_expiration_date,
                                trado_no: value.trade_no,
                                contract_start_date: value.contract_start_date,
                                contract_end_date: value.contract_end_date,
                                dealer_status: "running",

                            }).save().then(async () => {



                               await dealerGeneralInfo({total_dealers:1,active_dealers:1});

                               resolve();
                              //  resolve();
                            }).catch(err => {
                                reject(err);
                            })


                    })




            }else{
               reject("Already dealing ship running");

            }
        })
    })
};

const insertDealerRecord = ()=>{

}

const dealerGeneralInfo =  (value)=>{

   DealerInfoModel.find({}).then(async data=>{

       if(data.length !== 0){

           const dealerInfoModel = await DealerInfoModel.updateMany({},{
               $inc:value
           });

            return dealerInfoModel;


       }else{

       DealerInfoModel({
               total_dealers:1,
               paying_dealers:0,
               active_dealers:1,
               trial_dealers:0,
               paused_dealers:0,
               suspended_dealers:0,
           }).save().then(data=>{
               return data;
       });


       }
   })
}

const dealersInfo = ()=>{
    //this return like
    // total dealers
    // active dealers and more

    return new Promise((resolve,reject)=>{
        DealerInfoModel.find({}).then( async data=>{
            resolve(data[0]);
        }).catch(err=>{
            reject(err);
       });
    });
};

const dealersPersonalInfo = ($id)=>{


    return new Promise((resolve,reject)=>{
        DealerModel.findOne({_id:$id}).then( async data=>{
            const userId = data.user_id;
            const userData = await UserModel.findOne({_id:userId});



            resolve({
                dealingInformation:data,
                personalInfo:userData
            });

        }).catch(err=>{
            reject(err);
        });
    });

}

const allDealers = (pageno=0)=>{
    return new Promise((resolve,reject)=>{
        DealerModel.find({}).skip(pageno * 20).limit(20).then(data=>{

            resolve(data);
        }).catch(err=>{
             reject(err);
        });
    })
}

const searchDealer = (query)=>{
    return new Promise((resolve,reject)=>{
        const regexQuery = {
            $or:[{name: new RegExp(query, 'i')},
                {car_rental_company_name: new RegExp(query, 'i')},
                {license_no: new RegExp(query, 'i')},
                {trade_no: new RegExp(query, 'i')},
                {dealer_status:new RegExp(query, 'i')}]

        }
        DealerModel.find(regexQuery).then(data=>{
                 resolve(data);
        }).catch(err=>{
            reject(err);
        })
    })
};

const allCarRentalCompanyName = (id)=>{
   return new Promise((resolve,reject)=>{

       if(!id){
             DealerModel.find({},{"name":1,"_id":1,"car_rental_company_name":1}).then(data=>{
                 resolve(data);
             }).catch(err=>{
                 reject(err);
             })
       }else{
           DealerModel.findOne({_id:mongoose.Types.ObjectId(id)},{"name":1,"_id":1,"car_rental_company_name":1}).then(data=>{
               const arrData = [];
               arrData.push(data);
               resolve(arrData);
           }).catch(err=>{
               reject(err);
           })
       }
   })
};

const dealersCar = (companyId,pageno=0)=>{


    return new Promise((resolve,reject)=>{

         AddProductsModel.find({car_rental_company_id:companyId}).skip(pageno * 10).limit(10).then(data=>{
             if(data.length > 0)
               resolve(data);
             else reject("No data is found");
         }).catch(err=>{
             reject(err);
         })
    })
}


const dealerStats = (id)=>{
   return new Promise((resolve,reject)=>{
       DealerModel.findOne({_id:mongoose.Types.ObjectId(id)},{
           total_cars: 1,
           total_clicked:1,
           total_viewed: 1,
           total_leads: 1,
           total_active: 1,
           total_deactivated:1,


       }).then(data=>{
           resolve(data);
       }).catch(err=>{
          reject(err);
       })
   });
}

const dealerId = (userId)=>{

}


module.exports = {
      dealer,
    dealersInfo,
    allDealers,
    dealersPersonalInfo,
    searchDealer,
    allCarRentalCompanyName,
    dealerStats,
    dealersCar
}