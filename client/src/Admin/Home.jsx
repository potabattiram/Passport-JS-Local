import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth', { withCredentials: true })
            .then((res) => {
                if (!res.data.auth) {
                    navigate('/login')
                }
            })
    }, [])
    function Logout() {
        axios.get('http://localhost:3001/api/logout', { withCredentials: true })
            .then((res) => {
                console.log(res)
                if (!res.data.auth) {
                    navigate('/login')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>

            Admin Home
            <Button variant="contained" onClick={() => Logout()}>Log Out</Button>

        </>
    )
}