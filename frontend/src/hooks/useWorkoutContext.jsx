import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutcontext = ()=> {
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error('useWorkoutContext is being used out of scope... please check')
    }

    return context
}