import React from 'react';
import {Typography, Button} from "@mui/material";
import {getAuth, signOut} from "firebase/auth";
import {useNavigate} from "react-router";

const NoContent = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className="list-items">
            <Button onClick={() => handleLogOut()} className="logout-button" color="secondary" variant="contained">Log Out</Button>
            <Typography variant="h2">Выберите список</Typography>
        </div>
    );
};

export default NoContent;
