import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function UserList() {
    const [users, setUsers] = useState([])
    let { email } = useParams()

    useEffect(() => {
        const getUsers = async () => {
            await axios.get('http://127.0.0.1:5000/users')
                .then((res) => setUsers(res.data))
        }
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://127.0.0.1:5000/users/${id}`);
    }

    return (
        <Card sx={{ minHeight: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h4' sx={{ marginBottom: 3 }}>Список пользователей</Typography>
            <Table sx={{ background: '#424242', maxWidth: 700 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: '#fff' }}>ID</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Email</TableCell>
                        <TableCell sx={{ width: 100 }}>
                        </TableCell>
                        <TableCell sx={{ width: 100 }}>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (

                        <TableRow key={user.id}>
                            {user.email === 'admin' ? null :
                                <>
                                    <TableCell sx={{ color: '#fff' }}>{user.id}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{user.name}</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>{user.email}</TableCell>
                                    <TableCell>
                                        <Link to={`/${email}/list/users/${user.id}/edit`}><Button variant='contained'>Редактировать</Button></Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='contained' onClick={() => deleteUser(user.id)}>Удалить</Button>
                                    </TableCell>
                                </>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
