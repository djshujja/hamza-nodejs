const {mongoose,MongooseSchema} = require("../../server/connection");
const bcrypt = require("bcrypt");

const emailConfirmationSchema = new MongooseSchema({
    random_no:{
        type:Number
    }
});

module.exports = {
    emailConfirmationSchema,
    mongoose
};

