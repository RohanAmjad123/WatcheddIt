import { Grid } from "@mui/material";
import { Typography, Paper, IconButton, TextField, Button } from "@mui/material";
import PostVotes from './PostVotes'
import { Post } from '../interfaces/index'
import Link from 'next/link'
import { useAppSelector } from '../app/hooks'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function PostCard({ post }: { post: Post }) {
    const userState = useAppSelector((state) => state)
    const [showEdit, setShowEdit] = useState(false)
    const router = useRouter()
    const { mediaID, postID } = router.query

    useEffect(() => {
        setShowEdit(false)
    }, [userState])

    const defaultEditFormValues = {
        user: post.user,
        imdbID: post.imdbID,
        title: post.title,
        description: post.description
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
            user: post.user,
            imdbID: post.imdbID,
        }

        console.log(postDeleteData)
        axios.post(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/post/delete/${post._id}`, postDeleteData, { withCredentials: true })
            .then((response) => {
                router.push(`/${mediaID}`)
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

        axios.put(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/post/update/${post._id}`, editFormValues, { withCredentials: true })
            .then((response) => {
                router.push(`/${mediaID}/${postID}`)
                setShowEdit(false)
            }, (err) => {
                console.log(err)
            })
    }

    const userButtons = () => {
        if (userState.username === post.user || userState.type === 'admin') {
            return (
                <React.Fragment>
                    {userState.username === post.user &&
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
        <Grid item>
            <Paper>
                <Grid container direction="column" p={2}>
                    <Link href={`/${encodeURIComponent(post.imdbID)}/${encodeURIComponent(post._id)}`} passHref>
                        <div>
                            <Grid item>
                                <Typography variant="overline">{post.user}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">{post.title}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">{post.description}</Typography>
                            </Grid>
                        </div>
                    </Link>
                    <Grid item container direction="row" alignItems="center" pt={2}>
                        <Grid item>
                            <PostVotes postId={post._id} />
                        </Grid>
                        <Grid item xs />
                        {userButtons()}
                    </Grid>
                    {showEdit &&
                        <Grid item container rowSpacing={2} direction="column" pt={2}>
                            <Grid item>
                                <TextField fullWidth defaultValue={defaultEditFormValues['title']} label="Title" name="title" onChange={handleEditFormChange}></TextField>
                            </Grid>
                            <Grid item>
                                <TextField fullWidth defaultValue={defaultEditFormValues['description']} label="Description" name="description" onChange={handleEditFormChange}></TextField>
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
        </Grid >
    );
}