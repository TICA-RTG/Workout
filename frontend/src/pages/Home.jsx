import { useEffect } from "react"
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutcontext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";


const Home = ()=>{
    const { workouts, dispatch } = useWorkoutcontext()
    const { user } = useAuthContext()


useEffect(()=> {
    const URL = async () => {
        // const response = await fetch('https://workout-app-ekit.onrender.com/workouts')
        const response = await fetch("https://workout-app-ekit.onrender.com/workouts", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const data = await response.json()
        // console.log(response)

        if (response.ok) {
            dispatch({type: 'SET_WORKOUTS', payload: data})
        }

        // console.log(data, 'ibi like error dey here')
        
    }

    if (user) {
        URL()
    }
}, [dispatch, user])



    return (
        <div className="home">
            <div className="workouts"> 
                {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout={workout}/>
                )) }
            </div>
            <div>
             <WorkoutForm/>
            </div>
            
        </div>
        
    )
}

export default Home