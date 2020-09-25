const {mongoose,MongooseSchema} = require("../../server/connection");
const bcrypt = require('bcrypt');

const AddUsersSchemas = new MongooseSchema({
    full_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true
    },
    contact_no:{
        type:String,

    },
    isEmailVerified:{
        type:Boolean
    },
    country:{
        type:String
    },
    city:{
        type:String,

    },
    car_rental_company_name:{
        type:String,

    },
    rights:{
        type:String,
    },
    read:{
        type:Boolean,
    },
    tfirebase:{
      type:Boolean
    },
    write:{
        type:Boolean,
    },
    edit:{
        type:Boolean,
    },
    delete:{
        type:Boolean,
    }



});

AddUsersSchemas.pre("save",function(next){
   const user = this;
   if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10).then((hashPassword) =>{
        // result == true
        user.password = hashPassword;

        next();

    }).catch(err=>{
        throw err;

    });


});

module.exports = {
    mongoose,
    AddUsersSchemas,

};
