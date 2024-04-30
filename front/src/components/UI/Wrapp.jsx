import { AppBar, Box, Button, ButtonGroup, Card, Menu, MenuItem, ThemeProvider, Typography } from '@mui/material';
import React, { useState } from 'react';
import CardList from '../apps/CardList';

const Wrapp = ({ handleCard, admin, user, handleAuth }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>

            <Card color='primary' sx={{ backgroundColor: '#424242', color: '#fff', width: '1230px', padding: '10px' }} >
                <ButtonGroup >
                    <Button onClick={() => handleAuth(false)} variant='outlined' sx={{ backgroundColor: '#03a9f4' }}>Выход</Button>
                    <Button variant='outlined' sx={{ backgroundColor: '#03a9f4' }}>Листинг</Button>
                    <Button variant='outlined' sx={{ backgroundColor: '#03a9f4' }}>Профиль</Button>
                    <Button variant='outlined' sx={{ backgroundColor: '#03a9f4' }}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Меню
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {admin === true ?
                            <MenuItem onClick={handleClose}>Текущий пользователь: ${user.email}$</MenuItem>
                            :
                            <MenuItem onClick={handleClose}>Текущий пользователь: {user.email}</MenuItem>
                        }

                        <MenuItem onClick={handleClose}>Листинг</MenuItem>
                        {user.email === 'admin' ?
                            <MenuItem onClick={handleClose}>Добавить</MenuItem>
                            :
                            null
                        }
                    </Menu>
                </ButtonGroup>

            </Card>
            {admin === true ? <Typography variant='h5'>Добро пожаловать, {user.email}</Typography> : <Typography variant='h5'>Добро пожаловать, гость, {user.email}</Typography> }
            <CardList handleCard={(card) => handleCard(card)} />
        </Box>
    );
}

export default Wrapp;
