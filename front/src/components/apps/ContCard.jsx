import { Button, Card, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const ContCard = ({ card }) => {

    const [formData, setFormData] = useState({
        name: '',
        predmet: '',
        description: '',
        image: ''
    });

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/apps', formData);
            console.log(response.data);
            // card(false)
        } catch (error) {
            console.error(error);
            // card(true)
        }
    };

    return (
        <Card sx={{ minWidth: 800, minHeight: 600, display: 'flex', alignItems: 'stretch', flexDirection: 'column', justifyContent: 'center', placeItems: 'center', padding: 2 }}>
            <Typography variant='h5'>Добавление сервиса</Typography>
            <br />
            <br />
            <TextField value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} label='Название сервиса' />
            <br />
            <TextField value={formData.predmet} onChange={(e) => setFormData({ ...formData, predmet: e.target.value })} label='Предмет обучения' />
            <br />
            <TextField value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} label='Описание сервиса' />
            <br />
            <TextField value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} label='Ссылка на изображение' />
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => card(false)} variant='contained'>Назад</Button>
                <Button onClick={handleSubmit} variant='contained'>Создать</Button>
            </div>
        </Card>
    );
}

export default ContCard;
