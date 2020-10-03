const AddProductsModel = require("../../models/productModel");
const DealerModel = require("../../models/dealermodel");
const { mongoose } = require("../../server/connection");

const AddProducts = (value, imagePath, multipleImagePath) => {
  return new Promise((resolve, reject) => {
    if (value.car_rental_company_id !== "1") {
      console.log("this works with 1");
      console.log(value);
      DealerModel.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(value.car_rental_company_id) },
        {
          $inc: { total_cars: 1, total_active: 1 },
        },
        { new: true }
      ).then((dealerData) => {
        addData(
          value,
          imagePath,
          multipleImagePath,
          resolve,
          reject,
          dealerData.car_rental_company_name
        );
      });
    } else {
      console.log("this works without 1");
      addData(value, imagePath, multipleImagePath, resolve, reject);
    }
  });
};
//

// resolve();

const addData = (
  value,
  imagePath,
  multipleImagePath,
  resolve,
  reject,
  car_rental_company_name
) => {
  const addData = new AddProductsModel({
    name: value.name,
    location: value.location,
    descriptions: value.descriptions,
    model: value.model,
    multiple_image_path: multipleImagePath,
    imagePath,
    // rental_period: value.rental_period,
    daily_cost: value.daily_cost,
    weekly_cost: value.weekly_cost,
    monthly_cost: value.monthly_cost,
    daily_mileage_limit: value.daily_mileage_limit,
    weekly_mileage_limit: value.weekly_mileage_limit,
    monthly_mileage_limit: value.monthly_mileage_limit,
    mileage_limit: value.mileage_limit,
    color_available: value.color_available,
    doors: value.doors,
    transmission: value.transmission,
    engine: value.engine,
    terms: value.terms,
    // additional_mileage: value.additional_mileage,
    // toll_charge: value.toll_charge,
    // excess_claim: value.excess_claim,
    // security_deposit: value.security_deposit,
    // pickup_charge: value.pickup_charge,
    // accepted_in: value.accepted_in,
    //    car specification
    // specs_description: value.specs_description,
    //car features
    // features_description: value.features_description,
    car_rental_company_id: value.car_rental_company_id,
    car_type: value.car_type,
    car_rental_company_name,
  });
  addData
    .save()
    .then((data) => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
};

module.exports = AddProducts;
