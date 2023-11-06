import { Link } from 'react-router-dom'

const NavBar = ()=> {
    return (
        <header>
            <div className="nav-bar">
                <Link to="/">
                    <h1>RTG GYM</h1>
                </Link>
            </div>
        </header>
        
    )
}

export default NavBar