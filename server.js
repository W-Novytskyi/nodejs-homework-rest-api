const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Viacheslav:NFpDcwguFvPZGCph@cluster0.ni12onf.mongodb.net/db-contacts?retryWrites=true&w=majority";

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
// NFpDcwguFvPZGCph    NFpDcwguFvPZGCph

// , () => {
//   console.log("Server running. Use our API on port: 3000");
// });
