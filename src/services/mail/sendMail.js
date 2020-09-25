const sendmail = require('sendmail')();

const sendEmail = (from,to,subject,message)=>{
    return new Promise((resolve,reject)=>{
        sendmail({
            from:from,
            to:to,
            subject:subject,
            html:message
        },(err,reply)=>{
            if(err) return reject(err);

            resolve(reply);

        })
    })


}


module.exports = {
    sendEmail
}