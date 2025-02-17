import { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // const [formData, setFormData] = useState({
    //       email: '',
    //       password: '',
    //       confirmPassword: '',
    //     });
    const { signup, error, isPending } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        

        await signup (email, password, confirmPassword)
        console.log(email, password, confirmPassword)
        
    }

    // const handleChange = (e) => {
    //     setFormData({
    //       ...formData,
    //       [e.target.name]: e.target.value,
    //     });
    //   };

    return (
        <form onSubmit={handleSubmit} className='enter'>
            <h3>Signup</h3>
            <label>Email:
                <input
                    name = "email"
                    type = "email"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    placeholder='Enter email'/>
            </label>
            <label>Password:
                <input
                    name = "password"
                    type = "password"
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    placeholder='Enter password'/>
            </label>
            <label>Password:
                <input
                    name = "confirmPassword"
                    type = "Password"
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder='Retype password'/>
            </label>

            <button disabled={isPending} className='submit'>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup