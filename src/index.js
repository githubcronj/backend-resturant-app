require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5007

// const userRouter = require("./routes/user")

const app = express()

app.use(express.json())

const corsOptions = {
  credentials: true, 
  origin: (origin, callback) => {
    return callback(null, true)
    if(whitelist.includes(origin))
      return callback(null, true)

    callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions));
require("./routes")(app);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is up on ${port}`)
    })
    console.log("Database connected");
    
  });






module.exports = app


