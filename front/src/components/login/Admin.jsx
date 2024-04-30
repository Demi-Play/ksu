import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const Admin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        email === 'admin' && password === 'admin' ? null : null
    }

    return (
        <>
            <TextField onChange={(e) => setEmail(e.target.value)} id="filled-basic" label="email" variant="outlined" />
            <br />
            <TextField onChange={(e) => setPassword(e.target.value)} id="filled-basic" label="password" variant="outlined" />
            <br />
            <Button onClick={handleSubmit} variant='contained' color='primary' >Продолжить</Button>
        </>
    );
}

export default Admin;
