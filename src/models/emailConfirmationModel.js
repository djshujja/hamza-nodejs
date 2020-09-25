const {mongoose,emailConfirmationSchema} = require("./schemas/emailConfirmationSchema");

const EmailConfirmationModel = mongoose.model("email_confirmation",emailConfirmationSchema);

module.exports = EmailConfirmationModel;