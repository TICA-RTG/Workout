import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = ()=> {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext is being used out of scope... please check')
    }

    return context
}
