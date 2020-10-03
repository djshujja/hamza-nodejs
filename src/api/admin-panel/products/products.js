const route = require("express").Router();
const fs = require("fs");
const path = require("path");
const {
  loadAllProducts,
  AddProducts,
  deleteProduct,
  editSpecificProduct,
  UpdateProducts,
  loadSpecificProduct,
} = require("../../../services/products");

const {
  uploadProductFile,
  uploadMultipleFiles,
  deleteMultipleFiles,
} = require("../../../assets/utils/uploadFiles");

route.post("/new-product-detail", async (req, res, next) => {
  //console.log(req.files);

  // for(let i = 0; i < req.body.files.length; i++){
  //     console.log(req.body.files[i]);
  // }

  uploadMultipleFiles(
    req.files,
    __dirname + "/../../../assets/images/uploaded/",
    (uploadedImagePath, uploadMultipleImagePath) => {
      AddProducts(req.body, uploadedImagePath, uploadMultipleImagePath)
        .then(() => {
          res.send("{result:successful,reason:value inserted successfully}");
        })
        .catch((err) => {
          next(err);
        });
    }
  );
});

route.get("/load-all-products", async (req, res) => {
  loadAllProducts()
    .then((data) => {
      res.json(JSON.stringify(data));
    })
    .catch((err) => {
      res.json(JSON.stringify(err));
    });
});

route.get("/delete-product/:id", async (req, res) => {
  deleteProduct(req.params.id)
    .then(() => {
      res.send("data deleted successfully");
    })
    .catch((err) => {
      res.send("error occur " + err);
    });
});

route.get("/edit-specific-product/:id", async (req, res) => {
  editSpecificProduct(req.params.id)
    .then((data) => {
      res.json(JSON.stringify(data));
    })
    .catch((err) => {
      res.json(JSON.stringify(err));
    });
});

route.post("/update-products/:id", async (req, res, next) => {
  if (req.files) {
    uploadMultipleFiles(
      req.files,
      __dirname + "/../../../assets/images/uploaded/",
      (uploadedImagePath, uploadMultipleImagePath) => {
        deleteMultipleFiles(req.body.multiple_image_path);
        updateFile(req, res, next, uploadedImagePath, uploadMultipleImagePath);
      }
    );
  } else {
    updateFile(req, res, next);
  }
});

route.get("/load-specific-product/:id", async (req, res, next) => {
  loadSpecificProduct(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

route.post("/status/:id", async (req, res) => {
  await loadSpecificProduct(req.params.id).then((data) => {
    const oldStatus = data.status;
    data.status = req.body.status;
    data.save();
    res.send({
      data: data,
      message: `Status of car ${data.name} has been changed from ${oldStatus} to ${data.status}`,
    });
  });
});

const updateFile = (req, res, next, imgPath, multipleImagePath) => {
  UpdateProducts(req.params.id, req.body, imgPath, multipleImagePath)
    .then((data) => {
      res.json(JSON.stringify(data));
    })
    .catch((err) => {
      res.json(JSON.stringify(err));
    });
};

module.exports = route;
