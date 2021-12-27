import React, {useState} from 'react';
import './Authorization.scss'
import {TextField, Typography, Button} from "@mui/material";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const Login = () => {
    let navigate = useNavigate()

    const [emailField, setEmailField] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorText, setEmailErrorText] = useState<string>('');
    const [passwordField, setPasswordField] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorText, setPasswordErrorText] = useState<string>('');

    const handleSubmit = (emailField: string, passwordField: string) => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, emailField, passwordField)
            .then((userCredential) => {
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
                if(errorCode === 'auth/user-not-found') {
                    setEmailError(true)
                    setEmailErrorText('Такого пользователя не существует')
                }
                if(errorCode === 'auth/internal-error') {
                    setPasswordError(true)
                    setPasswordErrorText('Введите пароль')
                }
                if(errorCode === 'auth/wrong-password') {
                    setPasswordError(true)
                    setPasswordErrorText('Неверный пароль')
                }
            });
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            handleSubmit(emailField, passwordField)
        }
    }

    return (
        <div className="form-container">
            <Link className='auth-btn' to={'/registration'}>Registration</Link>
            <div className="form-content">
                <div className="vadim-image">
                    <img src="/vadim.jpg" alt=""/>
                </div>
                <Typography variant="h4" textAlign="center" marginTop="10px">Login</Typography>
                <TextField error={emailError} helperText={emailErrorText} required value={emailField} onChange={(e) => setEmailField(e.target.value)} className="login" fullWidth margin="normal" color="secondary" type="email" id="standard-basic" label="Email" variant="standard" />
                <TextField error={passwordError} helperText={passwordErrorText} required onKeyDown={handleEnterPress} type="password" value={passwordField} onChange={(e) => setPasswordField(e.target.value)} className="password" fullWidth margin="normal" color="secondary" id="standard-basic" label="Password" variant="standard" />
                <Button onClick={() => handleSubmit(emailField, passwordField)} className="create-user-button" color="secondary" variant="contained">Sign In</Button>
            </div>
        </div>
    );
};

export default Login;
