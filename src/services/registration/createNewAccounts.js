const AddUserModel = require("../../models/usermodel");


const createNewAccount = (values)=>{
    return new Promise((resolve,reject)=>{
        AddUserModel.countDocuments({ email: values.email }).then((count)=>{
            if(count > 0)
                return reject("This email is already in use by another account");

            AddUserModel({
                full_name:values.full_name,
                email:values.email,
                password:values.password,
                contact_no: values.contact_no,
                country:values.country,
                city:values.city,
                tfirebase:false,
                rights:values.rights,
                car_rental_company_name: values.car_rental_company_name,
                read:true,
                write:false,
                edit:false,
                isEmailVerified: false,
                delete:false

            }).save().then(()=>{
                resolve();
            }).catch(err=>{
                reject(err);
            })
        }).catch(err=>{
            reject(err);
        });

    })
};

const createAccountByFirebase = (values)=>{
    return new Promise((resolve,reject)=>{
        AddUserModel.findOne({email:values.email}).then(data=>{


            if(!data ){
                // account is not  present already

                AddUserModel({
                    full_name:values.full_name,
                    email:values.email,
                    password:"123456",
                    contact_no: "set later",
                    country:"set later",
                    city:"set later",
                    tfirebase:true,
                    rights:"visitor",
                    car_rental_company_name: "set later",
                    read:true,
                    write: false,
                    isEmailVerified: false,
                    edit:false,
                    delete:false

                }).save().then((result)=>{
                    resolve({
                        full_name:values.full_name,
                        email:values.email,
                        rights:"visitor",
                        read:true,
                        write: false,
                        edit:false,
                        delete:false,
                        contact_no: "set later",
                        _id:result._id
                    });
                }).catch(err=>{
                    reject(err);
                })


            }else{
                if(!data.tfirebase)
                  reject("This email is already present");
                else{
                    //resolve
                    resolve({
                       full_name:data.full_name,
                       email:data.email,
                       rights:data.rights,
                       read:data.read,
                       write:data.write,
                       edit:data.edit,
                       delete:data.delete,
                       contact_no:data.contact_no,
                       _id:data._id
                    });
                }
            }
        })
    })


}

module.exports = {
    createNewAccount,
    createAccountByFirebase
}
