import { Button, Card, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EditCard = () => {
    let { email } = useParams()
    let { id } = useParams();

    const [appData, setAppData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/app/${id}`);
                setAppData(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        if (appData && appData.name) {
            console.log(appData.name);
        }

        fetchData();
    }, [id]);

    const [formData, setFormData] = useState({
        name: appData && appData.name,
        predmet: appData && appData.predmet,
        description: appData && appData.description,
        image: appData && appData.image
    });

    {appData ? console.log(formData) : null}

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:5000/apps/${id}`, formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/apps/${id}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Card sx={{ minWidth: 800, minHeight: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', placeItems: 'center' }}>
            {appData ? (
                appData.message === '0' ? (
                    <Typography variant='h6'>Данные не найдены...</Typography>
                ) : (
                    <>
                        <Typography variant='h5'>Редактирование сервиса</Typography>
                        <br />
                        <br />
                        <TextField label='Название сервиса' onChange={(e) => setFormData({ ...formData, name: e.target.value })} defaultValue={formData.name} />
                        <br />
                        <TextField label='Предмет обучения' onChange={(e) => setFormData({ ...formData, predmet: e.target.value })} defaultValue={formData.predmet} />
                        <br />
                        <TextField label='Описание сервиса' onChange={(e) => setFormData({ ...formData, description: e.target.value })} defaultValue={formData.description} />
                        <br />
                        <TextField label='Ссылка на логотип сервиса' onChange={(e) => setFormData({ ...formData, image: e.target.value })} defaultValue={formData.image} />
                        <br />
                        <Link to={`/${email}/list`}>
                            <Button variant='contained' >Назад</Button>
                        </Link>
                        <Button variant='contained' color='error' onClick={handleDelete}>Удалить</Button>
                        <Button variant='contained' color='success' onClick={handleSubmit}>Изменить</Button>
                    </>
                )
            ) : (
                <Typography variant='h3'>{appData ? 'Загрузка данных...' : null}</Typography>
            )}
        </Card>
    );
}

export default EditCard;