const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
