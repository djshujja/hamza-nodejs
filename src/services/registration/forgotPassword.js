const {EmailConfirmationModel}  = require("../../models/emailConfirmationModel");
const {sendEmail} = require("../mail/sendMail");
const {randomno} = require("../../assets/utils/randomNo");

const emailConfirmationMail = (email)=>{
  return new Promise((resolve,reject)=>{
      sendEmail("no-reply@arabeti.nadvertex.com",email,"Password Recovery","Your secret Code is "+randomno)
          .then((result)=>{
              resolve(result);
          }).catch(err=>{
              reject(err);
      })
  })

};

module.exports = {
    emailConfirmationMail
}