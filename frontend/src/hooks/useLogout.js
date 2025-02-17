import { useAuthContext } from "./useAuthContext"
import { useWorkoutcontext } from "./useWorkoutContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchWorkout } = useWorkoutcontext()

    const logout = () => {

        //remove user from locoalstorage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        dispatchWorkout({type: 'SET_WORKOUTS', payload: null})

        //test button
        console.log('logout button clicked')
    }

    return {logout}
}