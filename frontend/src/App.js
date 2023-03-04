import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../src/components/Navbar/Navbar";
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import Settings from './pages/Settings/Settings'
import ReactLoading from 'react-loading';
import WeatherForm from "./components/Forms/WeatherForm";
import DeleteDeviceForm from "./components/Forms/DeleteDeviceForm";
import DeviceForm from "./components/Forms/DeviceForm";
import NotFound from "./pages/NofFound/NotFound";
import CreateUserForm from "./components/Forms/CreateUserForm";
import DeleteUserForm from "./components/Forms/DeleteUserForm";
import './style.css'
import VerfiyEmail from "./pages/VerifyEmail/VerfiyEmail";

function App() {
  const { state } = useSelector((state) => state.auth);
  console.log(state)
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
            <Route path="/opcje" element={<><Navbar /><Settings/></>}/>
            <Route path="/opcje/ustawienia/pogoda" element={<><Navbar /><WeatherForm/></>}/>
            <Route path="/opcje/ustawienia/dodaj" element={<><Navbar /><DeviceForm/></>}/>
            <Route path="/opcje/ustawienia/dodaj-uzytkownika" element={<><Navbar /><CreateUserForm/></>}/>
            <Route path="/opcje/ustawienia/usun-uzytkownika" element={<><Navbar /><DeleteUserForm/></>}/>
            <Route path="/opcje/ustawienia/usun" element={<><Navbar /><DeleteDeviceForm/></>}/>
            <Route path="/opcje/profil/nazwa" element={<><Navbar /><Profile/></>}/>
            <Route path="/weryfikacja/:nickname/:token" element={<VerfiyEmail/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
            {/* <Route path="/register" element={<Register/>}/> */}
        </Routes>
    </Router>
  );
}

export default App;
