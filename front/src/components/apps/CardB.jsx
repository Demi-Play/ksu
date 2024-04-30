import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const CardB = ({ handleCard, name, description, image, predmet, id }) => {
    const [height, setHeight] = useState(20);
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');
    const { email } = useParams();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/comments?appId=${id}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [id, comments]);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddComment = async (commentData) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/comments', commentData);
            console.log(response.data.message);
            const newComment = {
                id: response.data.id,
                userId: commentData.userId,
                appId: commentData.appId,
                text: commentData.text,
            };
            setComments([...comments, newComment]);
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const handleEditComment = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:5000/comments/${editCommentId}`, { text: editCommentText });
            console.log(response.data.message);
            const updatedComments = comments.map(comment => {
                if (comment.id === editCommentId) {
                    return { ...comment, text: editCommentText };
                }
                return comment;
            });
            setComments(updatedComments);
            setEditCommentId(null);
            setEditCommentText('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/comments/${commentId}`);
            console.log(response.data.message);
            const filteredComments = comments.filter(comment => comment.id !== commentId);
            setComments(filteredComments);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <Card sx={{ width: '1100px', minHeight: height, overflowY: 'hidden', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: 5 }}>
            <img width='60px' src={image} alt={name} />
            <br />
            <Typography sx={{ paddingLeft: 3, paddingRight: 3 }} variant='h6'>{name}</Typography>
            <br />
            <Typography sx={{ paddingRight: 3 }} variant='h7'><b>Дисциплина: </b>{predmet}</Typography>
            <br />
            <Typography variant='h7' sx={{ width: 400, height: expanded ? 'auto' : height, overflowY: 'hidden' }}>{description}</Typography>
            <br />
            <Button variant='text' sx={{ py: 1, px: 3, color: '#0005f9' }} onClick={handleClick}>подробнее</Button>
            <br />
            <Button variant='text' sx={{ py: 1, px: 3, color: '#0005f9' }} onClick={handleOpenDialog}>Комментарии</Button>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Добавить комментарий</DialogTitle>
                <DialogContent>
                    <AddCommentForm id={id} handleAddComment={handleAddComment} />
                    {Array.isArray(comments) && comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id}>
                                {editCommentId === comment.id ? (
                                    <>
                                        <TextField
                                            multiline
                                            fullWidth
                                            value={editCommentText}
                                            onChange={(e) => setEditCommentText(e.target.value)}
                                            variant="outlined"
                                        />
                                        <Button onClick={handleEditComment}>Сохранить</Button>
                                    </>
                                ) : (
                                    <>
                                        <Typography>{comment.text}</Typography>
                                        <Typography>{comment.date}</Typography>
                                        <Button onClick={() => {
                                            setEditCommentId(comment.id);
                                            setEditCommentText(comment.text);
                                        }}>Редактировать</Button>
                                        <Button onClick={() => handleDeleteComment(comment.id)}>Удалить</Button>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <Typography>Нет комментариев</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Отмена</Button>
                </DialogActions>
            </Dialog>
            {email === 'admin' ?
                <Link to={`/${email}/list/editcard/${id}`}>
                    <Button variant='text' sx={{ py: 1, px: 3, color: '#0005f9' }}>редактировать</Button>
                </Link>
                :
                null}
        </Card >
    );
};

export default CardB;



const AddCommentForm = ({ id }) => {
    const [userId, setUserId] = useState(Cookies.get('userData'));
    const [appId, setAppId] = useState(id);
    const [text, setText] = useState('');
    // console.log(appId, userId)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/comments', {
                userId: userId,
                appId: appId,
                text: text
            });

            console.log(response.data.message);
            // Дополнительные действия при успешном создании комментария, например, обновление списка комментариев
        } catch (error) {
            console.error('Error creating comment:', error);
            // Обработка ошибки, например, отображение сообщения пользователю
        }
    };

    return (
        <div>
            <h2>Написать комментарий</h2>
            <form onSubmit={handleSubmit}>
                {/* <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        hidden
                    />
                </div>
                <div>
                    <label>App ID:</label>
                    <input
                        type="text"
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        hidden
                    />
                </div> */}
                <div>
                    <label>Комментарий:</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};
