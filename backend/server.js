require('dotenv').config()

const express = require('express');
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')



//create app
const app = express();


//middleware
app.use(express.json())
app.use((req,res, next)=>{
    console.log(req.path, req.method)
    res.json({mssg: "welcome"})
    console.log('testing')
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

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

