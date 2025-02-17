import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const { login, error, isPending } = useLogin()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')// <--- HERE IS THE PROBLEM

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
        console.log(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className='enter'>
            <h3>login</h3>
            <label>Email:
                <input
                    type = "email"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    placeholder='Enter email'/>
            </label>
            <label>Password:
                <input
                    type = "password"
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    placeholder='Enter password'/>
            </label>

            <button disabled={isPending} className='submit'>Login</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login