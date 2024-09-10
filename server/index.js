const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const app = express();
const USERROUTES = require('./routes/UserRoutes')
dotenv.config()
app.use(express.json());
app.use(cors());

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to Database and Listening to PORT: ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting on MongoDB:", error);
  });

app.use('/api/user', USERROUTES)