const loadAllProducts =  require('./loadAllProducts');
 

const AddProducts = require('./addProducts');
const deleteProduct = require('./deleteProduct');
const editSpecificProduct = require('./editSpecificProduct');
const UpdateProducts = require('./updateProducts');
const {loadSpecificProduct} = require("./loadspecificproduct");



module.exports = {
    loadAllProducts,
    AddProducts,
    deleteProduct,
    editSpecificProduct,
    UpdateProducts,
    loadSpecificProduct
}