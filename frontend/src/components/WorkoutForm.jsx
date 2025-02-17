import { useState } from 'react'
import { useWorkoutcontext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutForm = ()=> {
    const { user } = useAuthContext()

    const { dispatch } = useWorkoutcontext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [added, setAdded] = useState('')
    const [ispending, setIspending] = useState(true)
    const [emptyFields, setEmptyFields] = useState([])

    // 'https://workout-app-ekit.onrender.com/workouts'

   const handleSubmit = async (e)=>{
    e.preventDefault()
    if (!user) {
        setError('Please login to add a workout')
        return
    }
    const workout = {title, load, reps}
    const response = await fetch("/api/workouts" , {
        method : 'POST',
        headers: {"content-Type" : "application/json",
            "Authorization" : `Bearer ${user.token}`
        },
        body: JSON.stringify(workout)
    })
        const data = await response.json()

        if (!response.ok) {
            setError(data.error)
            console.log('ibi like some error dey here')
            setEmptyFields(data.emptyFields)
        }
        if (response.ok) {
            setError(null)
            setEmptyFields([])
            console.log('new workout added', data)
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({type: 'CREATE_WORKOUT', payload: data})
            setAdded('Succes')
            setTimeout(()=>{
                setIspending(false)
            }, 1200)
            
            
        }
   }

   console.log(ispending)

    return (
        <div className='workout-form'>
            <form>
                <h3>Add a new Workout</h3>
                <label>Exercise Title</label>
                <input
                className= {emptyFields.includes('title') ? 'error': ''}
                type='text'
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                placeholder= {emptyFields.includes('title') ? 'required *' : 'Enter Exercise name'}
                />

                <label>Load (Kg)</label>
                <input
                type='number'
                value={load}
                onChange={(e)=> setLoad(e.target.value)}
                className= {emptyFields.includes('load') ? 'error': ''}
                placeholder= {emptyFields.includes('load') ? 'required *' : 'Enter Load Weight'}
                />

                <label>Reps</label>
                <input
                type='number'
                value={reps}
                onChange={(e)=> setReps(e.target.value)}
                className= {emptyFields.includes('reps') ? 'error': ''}
                placeholder= {emptyFields.includes('reps') ? 'required *' : 'Enter No. of Reps'}
                />

                <button className='submit' onClick={handleSubmit}>Add Workout</button>
                {ispending && <div className='workout-added'>{added}</div>}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default WorkoutForm