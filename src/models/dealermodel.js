const { mongoose, MongooseSchema } = require("../server/connection");

const DealerMongooseSchema = new MongooseSchema({
  name: {
    type: String,
  },
  user_id: {},
  car_rental_company_name: {
    type: String,
  },
  license_no: {
    type: String,
  },
  license_expiration_date: {
    type: Date,
  },
  trade_no: {
    type: String,
  },
  contract_start_date: {
    type: Date,
  },
  contract_end_date: {
    type: Date,
  },
  dealer_status: {
    type: String,
  },
  total_cars: {
    type: Number,
  },

  total_clicked: {
    type: Number,
  },

  total_viewed: {
    type: Number,
  },
  total_leads: {
    type: Number,
  },
  total_active: {
    type: Number,
  },
  total_deactivated: {
    type: Number,
  },
});

const DealerModel = mongoose.model("dealers", DealerMongooseSchema);

module.exports = DealerModel;
