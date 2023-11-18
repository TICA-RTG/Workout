require('dotenv').config()

const express = require('express');
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')



//create app
const app = express();


//middleware
app.use(express.json())
app.use((req,res, next)=>{
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
app.use('/workouts', workoutRoutes)
app.get('/', (req, res) => {
  res.json({mssg:'working'})
})

//connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log("listening to port", process.env.PORT )
        })
    })
    .catch((err)=>{
        console.log(err)
    })

