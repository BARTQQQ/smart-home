import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../src/components/Navbar/Navbar";
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import Settings from './pages/Settings/Settings'
import ReactLoading from 'react-loading';
import './style.css'

function App() {
  const { state } = useSelector((state) => state.auth);

  // pobiera obecna lokalizacje
  // const successCallback = (position) => {
  //   console.log(position);
  // };
  
  // const errorCallback = (error) => {
  //   console.log(error);
  // };
  // console.log(navigator.geolocation.watchPosition(successCallback, errorCallback))
  // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  return (
    <Router>
        <Routes>
            <Route path="/" element={state === 'loading' ? <ReactLoading className='loading' type="bubbles" color="#fff" /> : <><Navbar /><Dashboard/></>}/>
            <Route path="/profile" element={<><Navbar /><Profile/></>}/>
            <Route path="/settings" element={<><Navbar /><Settings/></>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </Router>
  );
}

export default App;
