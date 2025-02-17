import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const NavBar = ()=> {
    const {logout} = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
            logout()
    }

    return (
        <header className='big-nav'>
            <div className="nav-bar">
                <Link to="/">
                    <h1>RTG GYM</h1>
                </Link>
            </div>
            <div className='menu-box'>
                {user && (<div>
                        <span>{user.email}</span>
                        <button onClick={handleClick} className='click'>Logout</button>
                    </div>
                    )}
                {!user && (<ul className='menuss'>
                    <li><Link to="/Signup" className='click'>Signup</Link></li>
                    <li><Link to="/Login" className='click'>Login</Link></li>
                </ul>
                )}
            </div>
        </header>
        
    )
}

export default NavBar