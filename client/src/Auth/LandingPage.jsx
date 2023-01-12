import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    return (
        <>
            <div id="mainDiv">
                <h2>Landing Page</h2>
                <div id="redirectingButtons">
                    <button class="button-23" onClick={() => navigate('/login')}>Login</button>
                    <button class="button-23" onClick={() => navigate('/sign-up')}>Sign Up</button>
                </div>
            </div>
        </>
    )
}