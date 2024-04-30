import { Button, ButtonGroup, Card, Menu, MenuItem } from '@mui/material'
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { Link, redirect, useParams } from 'react-router-dom';

export default function Header() {
    let { email } = useParams()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const user = Cookies.get('userData')

    return (
        <Card color='primary' sx={{ backgroundColor: '#424242', color: '#fff', width: '1230px', padding: '10px' }} >
            <ButtonGroup >
                <Link to={'/'}>
                    <Button variant='outlined' sx={{ backgroundColor: '#03a9f4' }}>Выход</Button>
                </Link>
                {user ?
                    <Link to={`/${email}/list`}>
                        <Button variant='outlined' sx={{ backgroundColor: '#03a9f4' }}>Листинг</Button>
                    </Link>
                    : null}
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
                    {user ? (
                        // Используем массив элементов вместо Fragment
                        [
                            <Link key={`list-link-${email}`} to={`/${email}/list`}>
                                <MenuItem onClick={handleClose}>Листинг</MenuItem>
                            </Link>,
                        ]
                    ) : null}
                    {email === 'admin' ? (
                        <Link key={`add-link-${email}`} to={`/${email}/list/postcard`}>
                            <MenuItem onClick={handleClose}>Добавить</MenuItem>
                        </Link>
                    ) : null}
                    {email === 'admin' ? (
                        <Link key={`add-link-${email}`} to={`/${email}/list/users`}>
                            <MenuItem onClick={handleClose}>Пользователи</MenuItem>
                        </Link>
                    ) : null}
                </Menu>
            </ButtonGroup>

        </Card>
    )
}
