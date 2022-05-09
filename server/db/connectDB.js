const mongoose = require("mongoose");

mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connection success."))
  .catch((error) => {
    console.log(error);
  });
