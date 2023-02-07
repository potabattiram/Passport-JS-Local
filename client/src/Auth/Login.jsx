import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './styles.css';

import google from './media/google.svg';
import facebook from './media/facebook.svg';
import apple from './media/apple.svg';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function Login() {
        if (username && password) {
            axios.post('http://localhost:3001/api/login', { username, password }, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    if (res.data.status === 202) {
                        navigate('/admin/home')
                    }
                    else {
                        navigate('/login')
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            console.log('username or password empty')
        }
    }
    return (
        <>
            <div id="mainDiv">
                <h2>Login Page</h2>

                <div id="inputDiv">
                    <TextField id="outlined-basic" label="username" variant="outlined" type="text" onChange={(e) => setUsername(e.target.value)} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div id="buttonsDiv">
                    <Button variant="contained" onClick={() => Login()}>Login</Button>
                </div>

                <h4>or continue with</h4>

                {/* <div id="oauthDiv">
                    <div id="oauthButtons">
                        <div className="iconButton">
                            <img src={google} alt="google"/>
                        </div>
                        <div className="iconButton">
                            <img src={apple} alt="apple"/>
                        </div>
                        <div className="iconButton">                            
                            <img src={facebook} alt="facebook"/>
                        </div>
                    </div>
                </div> */}


                <div className="registerMsg">
                    Not a member? <span style={{ color: 'blue' }} onClick={() => navigate('/sign-up')}>Register now!</span>
                </div>
            </div>
        </>
    )
}