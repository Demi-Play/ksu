import { Button, Card, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function UserEdit() {
    let { id } = useParams()
    const [user, setUser] = useState([]);
    useEffect(() => {
        const getUser = async () => {
            axios.get(`http://localhost:5000/users/${id}`)
                .then((res) => res.data)
                .then((data) => setUser(data))
        }

        getUser();
    }, []);

    // console.log(user ? user : 'pizdec')

    const [formData, setFormData] = useState({
        name: user ? user.name : '',
        email: user ? user.email : '',
        password: user ? user.password : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const updateUser = async (data) => {
        await axios.post(`http://127.0.0.1:5000/users/${id}`, formData);
        // Handle success or error
        alert(`Пользователь успешно изменен: ${formData.email}`)
    };

    // console.log(user ? user.id : 0)
    return (
        <>
            {user ?
                <>{user.name}</>
                :
                null}
            {
                user ?
                    <Card sx={{
                        minWidth: 500,
                        minHeight: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        placeItems: 'center',
                        gap: 3
                    }
                    } >
                        <Typography variant='h5' sx={{ marginTop: 9 }} >Редактировать пользователя</Typography>
                        <TextField type="text" name="name" label='Имя' value={formData.name} onChange={handleChange} />
                        <TextField type="email" name="email" label='Почта' value={formData.email} onChange={handleChange} />
                        <TextField type="password" name="password" label='Пароль' value={formData.password} onChange={handleChange} />
                        <Button variant='contained' onClick={updateUser}>Сохранить</Button>
                    </Card >
                    : <Typography color='error'>Bad data type!</Typography>
            }
        </>
    )
}
