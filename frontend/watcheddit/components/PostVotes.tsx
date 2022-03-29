import { Grid, Typography, IconButton } from '@mui/material'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { Vote } from '../interfaces'
import { useState, useEffect } from 'react'
import { addVote } from '../app/actions/addVote'
import { updateVote } from '../app/actions/updateVote'
import { deleteVote } from '../app/actions/deleteVote'

import React from 'react'
import axios from 'axios'

export default function PostVotes({ postID }: { postID: string }) {
    const userState = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [votes, setVotes] = useState<Vote>({
        _id: postID,
        upVote: 0,
        downVote: 0
    });

    useEffect(() => {
        axios.get(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/post/${postID}/voting`, { withCredentials: true })
        .then((res) => {
            console.log(res.data)
            if (res.data !== "") {
                setVotes({
                    _id: postID,
                    upVote: res.data['upVote'],
                    downVote: res.data['downVote']
                })
            }
        }, (err) => {
            console.log(err)
        })
    }, [])

    const handleUpvoteClickNotVoted = () => {
        const vote = {
            vote: true
        }

        axios.post(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/post/${postID}/voting/user`, vote, { withCredentials: true })
        .then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err)
        })

        dispatch(addVote({
            postID: postID,
            vote: true
        }))
    }

    const handleDownvoteClickNotVoted = () => {
        const vote = {
            vote: false
        }

        axios.post(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/post/${postID}/voting/user`, vote, { withCredentials: true })
        .then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err)
        })

        dispatch(addVote({
            postID: postID,
            vote: false
        }))
    }

    const handleUpvoteClickVotedUpvote = () => {
        axios.delete(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/post/${postID}/voting/user`, { withCredentials: true })
        .then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err)
        })

        dispatch(deleteVote({
            postID: postID,
            vote: true
        }))
    }

    const handleDownvoteClickVotedUpvote = () => {
        const vote = {
            vote: false
        }

        axios.put(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/post/${postID}/voting/user`, vote, { withCredentials: true })
        .then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err)
        })

        dispatch(updateVote({
            postID: postID,
            vote: false
        }))
    }

    const handleUpvoteClickVotedDownvote = () => {
        const vote = {
            vote: true
        }

        axios.put(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/post/${postID}/voting/user`, vote, { withCredentials: true })
        .then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err)
        })

        dispatch(updateVote({
            postID: postID,
            vote: true
        }))
    }

    const handleDownvoteClickVotedDownvote = () => {
        axios.delete(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/post/${postID}/voting/user`, { withCredentials: true })
        .then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err)
        })

        dispatch(deleteVote({
            postID: postID,
            vote: true
        }))
    }

    const userStateVote = () => {
        if (userState.loggedIn) {
            const userHasVoted = userState.votes.some(element => {
                if (element.postID === postID) {
                    return true
                }
            })

            const userVotedPost = userState.votes.find(element => {
                return element.postID == postID
            })

            if (userHasVoted && userVotedPost != undefined) {
                if (userVotedPost['vote'] == true) {
                    return (
                        <React.Fragment>
                            <Grid item>
                                <IconButton onClick={handleUpvoteClickVotedUpvote}>
                                    <ArrowUpwardRoundedIcon color="success" />
                                </IconButton>
                            </Grid>
                            <Grid item justifyContent="center" direction="column" display="flex">
                                <Typography variant="subtitle1">{votes.upVote - votes.downVote}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleDownvoteClickVotedUpvote}>
                                    <ArrowDownwardRoundedIcon />
                                </IconButton>
                            </Grid>
                        </React.Fragment>
                    );
                }
                else {
                    return (
                        <React.Fragment>
                            <Grid item>
                                <IconButton onClick={handleUpvoteClickVotedDownvote}>
                                    <ArrowUpwardRoundedIcon />
                                </IconButton>
                            </Grid>
                            <Grid item justifyContent="center" direction="column" display="flex">
                                <Typography variant="subtitle1">{votes.upVote - votes.downVote}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleDownvoteClickVotedDownvote}>
                                    <ArrowDownwardRoundedIcon color="error" />
                                </IconButton>
                            </Grid>
                        </React.Fragment>
                    );
                }
            }
            else {
                return (
                    <React.Fragment>
                        <Grid item>
                            <IconButton onClick={handleUpvoteClickNotVoted}>
                                <ArrowUpwardRoundedIcon />
                            </IconButton>
                        </Grid>
                        <Grid item justifyContent="center" direction="column" display="flex">
                            <Typography variant="subtitle1">{votes.upVote - votes.downVote}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleDownvoteClickNotVoted}>
                                <ArrowDownwardRoundedIcon />
                            </IconButton>
                        </Grid>
                    </React.Fragment>
                );
            }
        }
        else {
            return (
                <React.Fragment>
                    <Grid item justifyContent="center" direction="column" display="flex">
                        <Typography variant="subtitle1">{votes.upVote - votes.downVote}</Typography>
                    </Grid>
                </React.Fragment>
            );
        }
    }

    return (
        <Grid item container direction="row">
            {userStateVote()}
        </Grid>
    );
}

