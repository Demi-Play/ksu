import { Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';

const Auth = ({ handleAut, handleAdmin, setUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState(null)

    const handleSubmit = async () => {

        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                email: email,
                password: password
            }),
        })

        const data = await response.json(); // Преобразование ответа в JSON
        console.log(data.id); // Вывод нужного свойства
        handleAut(true)
        setUser(data)
        Cookies.set('userData', data.id)
        email === data.email && password === data.password ? handleAdmin(true) : handleAdmin(false)
        history.push(`/${data.email}/list`);
    }


    return (
        <>
            <TextField onChange={(e) => setEmail(e.target.value)} id="filled-basic" label="email" variant="outlined" />
            <br />
            <TextField type='password' onChange={(e) => setPassword(e.target.value)} label="password" variant="outlined" />
            <br />
            <Button onClick={handleSubmit} variant='contained' color='primary' ><Link style={{ color: '#fff' }} to={`/${email}/list`}>Продолжить</Link></Button>
        </>
    );
}

export default Auth;
