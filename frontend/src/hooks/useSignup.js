import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();


    const signup = async (email, password, confirmPassword) => {
        setIsPending(true);
        setError(null);

            const response = await fetch('https://workout-app-ekit.onrender.com/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, confirmPassword })
                });
                const data = await response.json();
                if (!response.ok) {
                    setIsPending(false)
                    setError(data.error)
                    console.log(email, password, confirmPassword, 'kpikpisu')
                    }

                    if(response.ok) {
                    // save user to localstorage
                    localStorage.setItem('user', JSON.stringify(data))

                    // update the Auth Context
                    dispatch({ type: 'LOGIN', payload: data });
                    console.log(data, 'eja agben3')
                    setIsPending(false);
                    setError(null);
                    }
                   
                }
                return { signup, isPending, error}

}