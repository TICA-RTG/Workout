import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const WorkoutReducer = (state, action)=> {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                ...state,
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                ...state,
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                ...state,
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default: 
            return state
    }
}

export const WorkoutContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(WorkoutReducer, {
        workouts: null
    })

    return (
        //state here is an object
        <WorkoutContext.Provider value={{...state, dispatch}}>
             { children }
        </WorkoutContext.Provider>
    )
}

//export default WorkoutContextProvider