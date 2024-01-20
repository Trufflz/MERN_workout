import { useEffect, useState } from 'react'

// Components
import WorkoutDetails from '../components/WorkoutDetails'

export default function Home() {
    const [workouts, setWorkouts] = useState(null)
    
    //useEffect fires when component is rendered only once []
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json() //json == array of objects, where obj are workouts
        
            if (response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
        </div>
    )
}