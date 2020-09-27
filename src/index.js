const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { port } = require("./config/config");
const productRoute = require("./api/admin-panel/products/products");
const fileUpload = require("express-fileupload");
const registration = require("./api/registration/registration");
const { error, sendError } = require("./api/middleware/errorhandling");
const cookieParser = require("cookie-parser");
const usersRouter = require("./api/admin-panel/users/");
const dealerRouter = require("./api/admin-panel/dealer");
const bookingRouter = require("./api/booking/booking");
const showroomRouter = require("./api/admin-panel/showrooms/showroom");
const { mongoose } = require("./server/connection");
const carsrouter = require("./api/cars");
const { response } = require("express");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(fileUpload());
app.use("/src/assets", express.static(__dirname + "/assets"));
app.use(cookieParser());

// ============= ALL ROUTES HERE ==========
app.use("/api/admin-panel/products/", productRoute);
app.use("/api/registration", registration);
app.use("/api/users", usersRouter);
app.use("/api/dealership", dealerRouter);
app.use("/api/cars", carsrouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/showrooms", showroomRouter);

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/response", async (req, res) => {
  res.send({
    message: "Backend has been sucessfully deployed by Shujja (:",
  });
});

// ================ HANDLING ERROR AND SERVER LISTENING ==============

app.use(error);
app.use(sendError);

app.listen(port, () => {
  console.log("Server is listening on the port " + port);
});
