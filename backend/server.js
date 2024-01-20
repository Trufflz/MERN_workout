// --- Requirements ---
const express = require('express')
const app = express()
const workoutRoutes = require('./routes/workouts')

const mongoose = require('mongoose')

require('dotenv').config()
const port = process.env.PORT


// Middleware: [just log out type of request for now]
app.use(express.json()) //passes info to req to be used in routes
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// --- Routes [use the routes in workout.js]
app.use('/api/workouts', workoutRoutes)


// Connect DB to Server [then do ___, or catch errors]
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Only start listening for requests on the port once connected to the db
        app.listen(5000, () => {
            console.log('Workout Server is connected to db & has started listening >:3')
        })
    })
    .catch((error) => {
        console.log(error)
    })


//source: https://www.youtube.com/watch?v=8DploTqLstE&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=2
/* 
    Notes:
    Database can be local or online
      > Mongodb local install
      > mongodb atlas website

    mongoose == ODM library (object data modeling) [allows us to write js code to interact w db]
     allows us to read/write methods on top of the db & define schemas for structure
     > its a library on top of mongodb (js like express & node) ==> allows us to write js code that interacts with db

    web api = backend component (db = a backend component too)
     */