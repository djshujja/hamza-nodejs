const router = require("express").Router();
const {
  dealer,
  dealersInfo,
  allDealers,
  dealersPersonalInfo,
  searchDealer,
  allCarRentalCompanyName,
  dealerStats,
  dealersCar,
} = require("../../services/dealer");

const Dealers = require("../../models/dealermodel");

router.post("/make-new/", async (req, res, next) => {
  const date = Date.now();

  dealer(req.body)
    .then((saveData) => {
      res.send({
        message: "Successfully",
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/make-new-demo/", async (req, res, next) => {
  const date = Date.now();

  dealer({
    full_name: "Test user",
    user_id: "5e79f8b3e3ab042fd0b64f5b",
    license_no: "345",
    license_expiration_date: date,
    trade_no: "345",
    contract_start_date: date,
    contract_end_date: date,
    dealer_status: "running",
  })
    .then((saveData) => {
      res.send({
        message: "Successfully",
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/dealers-info", async (req, res, next) => {
  dealersInfo()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/detailed-info/:id", async (req, res, next) => {
  dealersPersonalInfo(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/all/:pageno", async (req, res, next) => {
  allDealers(req.params.pageno)
    .then((dealersData) => {
      res.send(dealersData);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/search", async (req, res, next) => {
  searchDealer(req.query.all)
    .then((resData) => {
      res.send(resData);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/all-company-name/", async (req, res, next) => {
  allCarRentalCompanyName()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/all-company-name/:id", async (req, res, next) => {
  allCarRentalCompanyName()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/stats/:id", async (req, res, next) => {
  dealerStats(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/edit-dealer/:id", async (req, res, next) => {
  const {
    license_expiration_date,
    license_no,
    contract_start_date,
    contract_end_date,
  } = req.body;

  try {
    const dealer = await Dealers.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        license_expiration_date: license_expiration_date,
        license_no: license_no,
        contract_start_date: contract_start_date,
        contract_end_date: contract_end_date,
      }
    );
    res.send(dealer);
  } catch (error) {
    next(error);
  }

  //   await dealersPersonalInfo(req.params.id)
  //     .then((data) => {
  //       data.license_expiration_date = license_expiration_date;
  //       data.license_no = license_no;
  //       data.contract_start_date = contract_start_date;
  //       data.contract_end_date = contract_end_date;
  //       data.save();

  //       res.send({
  //         data: data,
  //         message: "successfully updated!",
  //       });
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
});

router.get("/total-cars/:id/:pageno", async (req, res, next) => {
  dealersCar(req.params.id, req.params.pageno)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/get-dealer-id/", async (req, res, next) => {});

module.exports = router;
