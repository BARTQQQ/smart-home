import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar";
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import Settings from './pages/Settings/Settings'
import './style.css'

function App() {
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
            <Route path="/" element={<><Navbar /><Dashboard/></>}/>
            <Route path="/profile" element={<><Navbar /><Profile/></>}/>
            <Route path="/settings" element={<><Navbar /><Settings/></>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </Router>
  );
}

export default App;
