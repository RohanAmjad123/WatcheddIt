import { Grid, Typography, Paper, Button, TextField, IconButton } from '@mui/material'
import { Comment } from '../interfaces/index'
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router'

export default function CommentCard({ comment }: { comment: Comment }) {
    const userState = useAppSelector((state) => state)
    const [showEdit, setShowEdit] = useState(false)
    const router = useRouter()
    const { mediaID, postID } = router.query

    useEffect(() => {
        setShowEdit(false)
    }, [userState])

    const defaultEditFormValues = {
        user: comment.user,
        postID: comment.postID,
        text: comment.text
    }

    const [editFormValues, setEditFormValues] = useState(defaultEditFormValues)

    const openEdit = () => {
        setShowEdit(true)
    }

    const closeEdit = () => {
        setShowEdit(false)
    }

    const handleDelete = () => {
        const postDeleteData = {
            user: comment.user,
            postID: comment.postID,
        }

        console.log(comment._id);

        console.log(postDeleteData)
        axios.post(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/comment/delete/${comment._id}`, postDeleteData, { withCredentials: true })
            .then((response) => {
                router.push(`/${mediaID}/${postID}`)
                console.log(response)
             }, (err) => { 
                console.log(err) 
            });
    }

    const handleEditFormChange = (event: any) => {
        const { name, value } = event.target
        setEditFormValues((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleEditFormSubmit = () => {
        console.log(editFormValues)

        axios.put(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/comment/update/${comment._id}`, editFormValues, { withCredentials: true })
            .then((response) => {
                router.push(`/${mediaID}/${postID}`)
                setShowEdit(false)
            }, (err) => {
                console.log(err)
            })
    }

    const userButtons = () => {
        if (userState.username === comment.user || userState.type === 'admin') {
            return (
                <React.Fragment>
                    {userState.username === comment.user &&
                        <Grid item pt={2}>
                            <IconButton onClick={openEdit}>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    }
                    <Grid item pt={2}>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </React.Fragment>
            );
        }
    }
    
    return (
        <Grid item xs>
            <Paper>
                <Grid container p={2} direction="column">
                    <Grid item>
                        <Typography variant="overline">{comment.user}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{comment.text}</Typography>
                    </Grid>
                    <Grid item container direction="row" alignItems="center" pt={2}>
                        <Grid item xs />
                        {userButtons()}
                    </Grid>
                    {showEdit &&
                        <Grid item container rowSpacing={2} direction="column" pt={2}>
                            <Grid item>
                                <TextField fullWidth defaultValue={defaultEditFormValues['text']} label="Comment" name="text" onChange={handleEditFormChange}></TextField>
                            </Grid>
                            <Grid item container columnSpacing={1} direction="row">
                                <Grid item>
                                    <Button variant="contained" onClick={handleEditFormSubmit}>Save</Button>
                                </Grid>
                                <Grid item>
                                    <Button color="success" variant="outlined" onClick={closeEdit}>Cancel</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Paper>
            </Grid>
    );
}