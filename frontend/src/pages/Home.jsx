import { useEffect } from "react"
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutcontext } from "../hooks/useWorkoutContext";


const Home = ()=>{
    const { workouts, dispatch } = useWorkoutcontext()


useEffect(()=> {
    const URL = async () => {
        const response = await fetch('/api/workouts')
        const data = await response.json()

        if (response.ok) {
            dispatch({type: 'SET_WORKOUTS', payload: data})
        }

        console.log(data)
    }

    URL()
}, [dispatch])



    return (
        <div className="home">
            <div className="workouts"> 
                {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout={workout}/>
                )) }
            </div>
            
            <WorkoutForm/>
        </div>
        
    )
}

export default Home