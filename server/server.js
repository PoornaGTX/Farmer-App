const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const farmerRoutes = require("./routes/farmerRoutes");
const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
require("./db/connectDB");

//set the routes
app.use("/api", farmerRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Service started on port: ${port}`);
});
