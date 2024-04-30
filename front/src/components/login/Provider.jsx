import { Box, Button, Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import Reg from './Reg';
import Auth from './Auth';
import { redirect } from 'react-router-dom';

const Provider = () => {
    const [switcher, setSwitcher] = useState(true)
    const [card, setCard] = useState(false)
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState({})
    const [adminStatus, setAdminStatus] = useState(false)

    const handleSwitch = (switcher) => {
        setSwitcher(!switcher)
    }

    const redir = () => {
        redirect(`/${user.email}/list`)
    }
    const handleAut = (auth) => {
        setAuth(auth)
        
    }

    const handleAdmin = (admin) => {
        setAdminStatus(admin)
    }

    return (
        <>
            <Card sx={{ width: '600px', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h5'>{switcher === true ? 'Регистрация' : 'Авторизация'}</Typography>
                <br />
                {switcher === true ? <Reg redir={redir} handleAut={handleAut} setUser={(user) => setUser(user)} /> : <Auth redir={redir} handleAut={handleAut} setUser={(user) => setUser(user)} handleAdmin={(admin) => { handleAdmin(admin) }} />}
                <Button onClick={() => handleSwitch(switcher)} variant='text' color='primary'>{switcher === false ? 'Регистрация' : 'Авторизация'}</Button>
            </Card>
        </>
    );
}

export default Provider;