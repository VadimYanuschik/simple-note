import React, {useState} from 'react';
import './Authorization.scss'
import {TextField, Typography, Button} from "@mui/material";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Registration() {
    let navigate = useNavigate()

    const [emailField, setEmailField] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorText, setEmailErrorText] = useState<string>('');
    const [passwordField, setPasswordField] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorText, setPasswordErrorText] = useState<string>('');

    const handleSubmit = (emailField: string, passwordField: string) => {
        const auth = getAuth();

        if(emailField.length < 5) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
        if(passwordField.length < 5) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
        createUserWithEmailAndPassword(auth, emailField, passwordField)
            .then((userCredentials) => {
                const user = userCredentials.user
                navigate('/lists')
            })
            .catch((error) => {
                let errorCode = error.code
                console.log(errorCode)

                setEmailError(false)
                setPasswordError(false)
                setEmailErrorText('')
                setPasswordErrorText('')

                if(errorCode === 'auth/invalid-email') {
                    setEmailError(true)
                    setEmailErrorText('Неверный Email')
                }
                if(errorCode === 'auth/internal-error') {
                    setEmailError(true)
                    setPasswordError(true)
                    setEmailErrorText('Неверный Email')
                    setPasswordErrorText('Неверный пароль')
                }
                if(errorCode === 'auth/weak-password') {
                    setPasswordError(true)
                    setPasswordErrorText('Короткий пароль (мин. 6 символов)')
                }
            })
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            handleSubmit(emailField, passwordField)
        }
    }

    return (
        <div className="form-container">
            <Link className='auth-btn' to={'/login'}>Login</Link>
            <div className="form-content">
                <div className="vadim-image">
                    <img src="/vadim.jpg" alt=""/>
                </div>
                <Typography variant="h4" textAlign="center" marginTop="10px">Registration</Typography>
                <TextField required error={emailError} helperText={emailErrorText} value={emailField} onChange={(e) => setEmailField(e.target.value)} className="login" fullWidth margin="normal" color="secondary" type="email" id="standard-basic" label="Email" variant="standard" />
                <TextField required error={passwordError} helperText={passwordErrorText} onKeyDown={handleEnterPress} value={passwordField} onChange={(e) => setPasswordField(e.target.value)} className="password" fullWidth margin="normal" color="secondary" id="standard-basic" label="Password" variant="standard" />
                <Button onClick={(event) => handleSubmit(emailField, passwordField)} className="create-user-button" color="secondary" variant="contained">Create</Button>
            </div>
        </div>
    );
}

export default Registration;