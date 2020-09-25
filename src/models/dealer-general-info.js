const {mongoose,MongooseSchema} = require("./../server/connection");

const DealerGeneralInfoSchema  =new MongooseSchema({
    total_dealers:{
        type:Number,
    },
    paying_dealers:{
        type:Number,

    },
    active_dealers:{
      type:Number,

    },
    trial_dealers:{
        type:Number,
    },
    paused_dealers:{
        type:Number,
    },
    suspended_dealers:{
        type:Number
    },




});

const DealerInfoModel = mongoose.model("dealers-info",DealerGeneralInfoSchema);

module.exports = {
    DealerInfoModel
};