import { useState } from 'react'

export default function WorkoutForm() {
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')

    const handleSubmit = async (e) => {
        e.prevevntDefault() //prevent refreshing of page
        
        //Fetch data to post workouts
        const workout = {title, reps, load}
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout)
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Exercise Reps:</label>
            <input
                type='number'
                onChange={(e) => setReps(e.target.value)}
                value={title}
            />

        <label>Exercise Load:</label>
            <input
                type='number'
                onChange={(e) => setLoad(e.target.value)}
                value={title}
            />

            <button>Add Workout</button>
        </form>
    )
}