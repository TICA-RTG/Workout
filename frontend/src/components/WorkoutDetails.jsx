import { useWorkoutcontext } from "../hooks/useWorkoutContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout })=> {

    const { dispatch } = useWorkoutcontext()

    const handleDelete = async ()=> {
        const response = await fetch('https://workout-app-ekit.onrender.com/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const data = await response.json()
         
        if (response.ok) {
            dispatch({type:'DELETE_WORKOUT', payload:data})
        }
        
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="delete-button" onClick={handleDelete}>Delete</span>
        </div>
    )
}

export default WorkoutDetails