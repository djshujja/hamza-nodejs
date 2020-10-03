const { mongoose, MongooseSchema } = require("../../server/connection");

const AddProductsSchemas = new MongooseSchema({
  name: {
    type: String,
  },

  location: {
    type: String,
  },

  descriptions: {
    type: String,
  },
  model: {
    type: String,
  },

  imagePath: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  // rental period
  // rental_period:{
  //   type:String,
  // },

  daily_cost: {
    type: String,
  },

  weekly_cost: {
    type: String,
  },

  monthly_cost: {
    type: String,
  },

  daily_mileage_limit: {
    type: String,
  },
  weekly_mileage_limit: {
    type: String,
  },
  monthly_mileage_limit: {
    type: String,
  },
  color_available: {
    type: String,
  },
  additional_mileage: {
    type: String,
  },
  toll_charge: {
    type: String,
  },
  excess_claim: {
    type: String,
  },
  security_deposit: {
    type: String,
  },
  pickup_charge: {
    type: String,
  },
  accepted_in: {
    type: String,
  },
  //    car specification
  specs_description: {
    type: String,
  },
  //car features
  features_description: {
    type: String,
  },
  car_rental_company_id: {
    type: String,
  },
  car_rental_company_name: {
    type: String,
  },
  car_type: {
    type: String,
  },
  multiple_image_path: {
    type: String,
  },
  showroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Showroom",
  },
  doors: {
    type: String,
  },
  transmission: {
    type: String,
  },
  engine: {
    type: String,
  },
  terms: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "pause"],
    default: "active",
  },
});

module.exports = {
  AddProductsSchemas,
  mongoose,
};
