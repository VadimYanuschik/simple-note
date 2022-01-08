import './App.scss';
import Sidebar from "./components/Sidebar/Sidebar";
import ListItems from "./components/ListItems/ListItems";
import NoContent from "./components/NoContent/NoContent";

import {Route, Routes, useNavigate} from "react-router-dom";
import Registration from "./components/Authorization/Registration";
import Login from "./components/Authorization/Login";
import {useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";


function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login')
            }
        });
    }, []);

    return (
        <div className="App">
            <div className="container">
                <Routes>
                    <Route path="/" element={<><Sidebar/><NoContent/></>}/>
                    <Route path="/lists" element={<><Sidebar/><NoContent/></>}/>
                    <Route path="/lists/:id" element={<><Sidebar/><ListItems/></>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
