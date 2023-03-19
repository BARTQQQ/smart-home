import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../src/components/Navbar/Navbar";
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
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
import UpdateUserFrom from "./components/Forms/UpdateUserFrom";
import { io } from "socket.io-client";

function App() {
  const { state } = useSelector((state) => state.auth);
 
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
            <Route path="/opcje/profil/nazwa" element={<><Navbar /><UpdateUserFrom/></>}/>
            <Route path="/weryfikacja/:nickname/:token" element={<VerfiyEmail/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
            {/* <Route path="/register" element={<Register/>}/> */}
        </Routes>
    </Router>
  );
}

export const socket = io("ws://192.168.0.115:4001", {
  reconnection: true,
  reconnectionAttempts: 5
});

socket.on("connect", () => {
  console.log("WebSocket connected");
});

socket.on("disconnect", (reason) => {
  console.log("WebSocket disconnected:", reason);
});
export default App;
