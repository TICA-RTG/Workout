import { useWorkoutcontext } from "../hooks/useWorkoutContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"

// 'https://workout-app-ekit.onrender.com/workouts/'

const WorkoutDetails = ({ workout })=> {
    const { user } = useAuthContext()

    const { dispatch } = useWorkoutcontext()

    const handleDelete = async ()=> {
        if (!user) {
            console.log('you cannot delete foko')
            return
        }
        const response = await fetch('https://workout-app-ekit.onrender.com/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
                }
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