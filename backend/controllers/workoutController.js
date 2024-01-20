//---Controllers [separating db logic code from routes file]
const Workout = require('../models/WorkoutModel') //allows us to interact with db directly from js
const mongoose = require('mongoose')

//GET all workouts
const getWorkouts = async (req, res) => {
    //get all workout docs & sort from descending order(newest at top)
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//GET a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params
    
    //check if ID is valid first, or else server will crash trying to search in db
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    //grab document by id
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({error: 'No such workout found'})
    }
    res.status(200).json(workout)
}


//POST a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body //extract info from frontend form via 'js destructuring'
    
    try {
        //Try adding a new doc to the db w/ these properties 
        const workout = await Workout.create({title, reps, load}) //reqs to db, like create take a long time ==> async/await it to speed our program up
        res.status(200).json(workout) //send back workout as json && an 'OK' status code
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}


//DELETE an existing workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    //check if ID is valid first, or else server will crash trying to search in db
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    //check if we found a workout to delete
    if (!workout) {
        return res.status(404).json({error: 'No such workout found'})
    }
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params
    //check if ID is valid first, or else server will crash trying to search in db
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body //'spread' operator to spread all properties into this object to update
    })
    if (!workout) {
        return res.status(404).json({error: 'No such workout found'})
    }
    res.status(200).json(workout)

}

//--- Export functions for other files to use
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}


//Model == is it a template for all your docs in the db? (what the doc looks like)
//schema == structure (what is needed in your doc)