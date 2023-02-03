import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './styles.css';

import google from './media/google.svg';
import facebook from './media/facebook.svg';
import apple from './media/apple.svg';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function SignUp() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    function SignUp(){
        if(username && password){
            axios.post('http://localhost:3001/api/signup',{username,password},{withCredentials:true})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else{
            console.log('username or password empty')
        }
    }

    function googleOAuth(){
        console.log('clicked')
        axios.get('http://localhost:3001/api/auth/google')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <div id="mainDiv">
                <h2>Sign Up</h2>

                <div id="inputDiv">
                    <TextField id="outlined-basic" label="username" variant="outlined" type="text" onChange={(e) => setUsername(e.target.value)}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div id="buttonsDiv">
                    <Button variant="contained" onClick={() => SignUp()}>Sign Up!</Button>
                </div>

                <h4>or continue with</h4>

                <div id="oauthDiv">
                    <div id="oauthButtons">
                        <div className="iconButton">
                            <img src={google}  onClick={() => { googleOAuth();}} alt="google"/>
                        </div>
                        <div className="iconButton">
                            <img src={apple} alt="apple"/>
                        </div>
                        <div className="iconButton">                            
                            <img src={facebook} alt="facebook"/>
                        </div>
                    </div>
                </div>


                <div className="registerMsg">
                    Already have an account? <span style={{color:'blue'}} onClick={() => navigate('/login')}>Log In!</span>
                </div>
            </div>
        </>
    )
}