import './App.css'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Posts from './pages/Posts'
import SideBar from './components/SideBar'
import { AppContext } from './context/AppContext';
import { useContext} from 'react'
import Auth from './pages/Auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Post from './pages/Post'
import Modal from './components/PostModal';

function App() {
  const {showSidebar} = useContext(AppContext);
  return (
    <div className='mm bg-gray-100 flex'>
      <Router>
      {showSidebar && <SideBar/>}
        <Routes>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/yourposts' element={<Posts isYourPosts={true}/>}/>
          <Route path='/' element={<Posts isYourPosts={false}/>}/>
          <Route path='/post/:id' element={<Post/>}/>
        </Routes>
      <Modal/>
      <ToastContainer/>
      </Router>
    </div>
  )
}

export default App
