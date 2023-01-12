import React from 'react';
import {Navigate, Route,Routes} from 'react-router-dom';
import Home from './Admin/Home';
import './App.css';
import LandingPage from './Auth/LandingPage';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import axios from 'axios';
import Protected from './Protected';


function App() {
  function isLoggedIn(){
    axios.get('http://localhost:3001/api/auth')
        .then((res) => {
            return res.data.auth
        })
        .catch((err) => {
            console.log(err);
        })
  }
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/sign-up" element={<SignUp/>}/>

        <Route exact path="/admin/home" element={<Home/>}/>

      </Routes>
    </>
  );
}

export default App;
