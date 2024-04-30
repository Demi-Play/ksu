import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardB from './CardB';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CardList = ({ handleCard }) => {

    const [appList, setAppList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/apps');
                setAppList(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []); // Передача пустого массива зависимостей

    return (
        <>
            <Box sx={{ width: '1250px', height: '838px', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: '#757575', display: 'flex', placeItems: 'center', flexDirection: 'column' }}>
                {appList.map(app => (

                    <CardB key={app.id} id={app.id} name={app.name} description={app.description} image={app.image} predmet={app.predmet} handleCard={(card) => handleCard(card)} />
                ))}
            </Box>
        </>
    );
}

export default CardList;
