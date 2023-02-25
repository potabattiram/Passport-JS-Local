import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';

import { renderToString } from "react-dom/server";

export default function Home() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        hotelName: '',
        city: '',
        totalTables: ''
    })

    const [qrObjects, setQrObjects] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth', { withCredentials: true })
            .then((res) => {
                if (!res.data.auth) {
                    navigate('/login')
                }
            })
    }, [])

    useEffect(() => {
        console.log("Data Updated!")
    }, [qrObjects])

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
    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    function generateQRCodes() {
        if (!data.totalTables) return;

        let tempVar = [];
        for (let i = 0; i < parseInt(data.totalTables); i++) {
            tempVar.push({
                id: i,
                hotelName: data.hotelName,
                city: data.city,
                table: i + 1
            })
        }
        setQrObjects(tempVar);
        console.log(qrObjects);

        const string = renderToString(<QRCode value={`http://localhost:3011/${1234}`} />);
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addPage();
        pdf.fromHTML(string);
        console.log(string,'strings')
        
        // pdf.save("pdf");
    }


    return (
        <>
            Admin Home
            <Button variant="contained" onClick={() => Logout()}>Log Out</Button>

            <div>
                <h2>Please provide the hotel details!</h2>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem', gap: '1rem' }}>
                    <TextField id="outlined-basic" label="Hotel Name" variant="outlined" name="hotelName" onChange={handleChange} />

                    <TextField id="outlined-basic" label="City" variant="outlined" name="city" onChange={handleChange} />
                    <TextField id="outlined-basic" label="Total Tables" variant="outlined" name="totalTables" type="number" onChange={handleChange} />

                    <Button variant="outlined" style={{ width: "8rem" }} onClick={() => generateQRCodes()}>Generate QR</Button>
                </div>



                {qrObjects && qrObjects.map((obj) => (
                    <div key={obj.id}>
                        <QRCode value={`http://localhost:3011/${obj.hotelName}/${obj.city}/${obj.table}`} />
                    </div>
                ))}
            </div>
        </>
    )
}