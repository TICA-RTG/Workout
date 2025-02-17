import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/NavBar'
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      
      <BrowserRouter>
        <NavBar/>
        <div className='pages' >
          <Routes>
            <Route path='/' element={user ? <Home/> : <Navigate to = '/login'/>}/>
            <Route path='/signup' element={!user ? <Signup/> : <Navigate to = '/login'/>}/>
            <Route path='/login' element={!user ? <Login/> : <Navigate to = '/'/>} />
                    
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
