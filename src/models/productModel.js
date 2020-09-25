
const {AddProductsSchemas,mongoose}  = require("./schemas/addProductsSchemas");

const AddProductsModel = mongoose.model("products",AddProductsSchemas);

module.exports = AddProductsModel;
