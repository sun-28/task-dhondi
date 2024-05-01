import './App.css'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Profile from './pages/Profile'
import Posts from './pages/Posts'
import SideBar from './components/SideBar'
import { AppContext } from './context/AppContext';
import { useContext } from 'react'
import Auth from './pages/Auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {isLogged} = useContext(AppContext);
  return (
    <div className='mm bg-gray-100 flex'>
      {isLogged && <SideBar/>}
      <Router>
        <Routes>
          <Route path='/' element={<Auth/>}/>
          <Route path='/yourposts' element={<Posts isYourPosts={true}/>}/>
          <Route path='/feed' element={<Posts isYourPosts={false}/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  )
}

export default App
