const mongoose = require('mongoose')

const Schema = mongoose.Schema

// --- Schema (defining what the structure of our object data should look like)
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })

//apply schema to model --> builds a 'Workouts' collection in the db
//model = wrapper around schema that allows us to create/delete/update documents in the db

// --- Model (creates a collection in the mongoDB called 'Workouts', then creates workout documents in that collection using our model, which used the schema)
module.exports = mongoose.model('Workout', workoutSchema)
    //now, you can also do things that u can do on the website in code now