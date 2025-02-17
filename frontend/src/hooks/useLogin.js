import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();


    const login = async (email, password) => {
        setIsPending(true);
        setError(null);

            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (!response.ok) {
                    setIsPending(false)
                    setError(data.error)
                    console.log(email, password)
                    }

                    if(response.ok) {
                    // save user to localstorage
                    localStorage.setItem('user', JSON.stringify(data))

                    // update the Auth Context
                    dispatch({ type: 'LOGIN', payload: data });
                    console.log(data)
                    setIsPending(false);
                    setError(null);
                    }
                   
                }
                return { login, isPending, error}

}