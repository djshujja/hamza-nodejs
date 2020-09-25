const {mongoose,AddUsersSchemas} = require("./schemas/addUserSchemas");
const usermodel =  mongoose.model("users",AddUsersSchemas);
module.exports = usermodel;