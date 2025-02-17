require('dotenv').config()

const express = require('express');
// const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')



//create app
const app = express();


//middleware
// app.use(cors())
app.use(express.json())
app.use((req,res, next)=>{
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
      );
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }
    console.log(req.path, req.method)
    next()
})

//routes
// app.use('/workouts', workoutRoutes)
app.use('/user' , userRoutes)
app.get('/workouts', (req, res) => {
  res.json({mssg:'working'})
})

//connect to db
// this connection be for going live
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log("Database connected & listening to port", process.env.PORT )
        })
    })
    .catch((err)=>{
        console.log(err.message, 'THE DATABASE NO DEY CONNECT OO')
    })

