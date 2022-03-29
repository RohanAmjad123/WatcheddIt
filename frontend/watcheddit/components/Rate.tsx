import React from 'react'
import { useState } from 'react'
import { Rating, Grid, Typography } from '@mui/material'
import { Media } from '../interfaces/index'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addRating } from '../app/actions/addRating'
import { updateRating } from '../app/actions/updateRating'
import axios from 'axios'

export default function Rate({ media }: { media: Media }) {
    const [value, setValue] = useState(0)
    const [userRatings, setUserRatings] = useState()
    const userState = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const handleChange = async (event: any, newValue: number | null) => {
        if (newValue != null) {
            setValue(newValue)

            await axios.post(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/media/${media.imdbID}/ratings/user`, { rating: newValue }, { withCredentials: true })
                .then((response) => {

                }, (error) => {
                    console.log(error)
                })

            dispatch(addRating({
                imdbID: media.imdbID,
                rating: newValue
            }))

        }
    }

    const handleRatingUpdate = async (event: any, newValue: number | null) => {
        if (newValue != null) {
            setValue(newValue)

            await axios.put(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/media/${media.imdbID}/ratings/user`, { rating: newValue }, { withCredentials: true })
                .then((response) => {

                }, (error) => {
                    console.log(error)
                })

            dispatch(updateRating({
                imdbID: media.imdbID,
                rating: newValue
            }))
        }
    }

    const userStateRating = () => {
        if (userState.loggedIn) {
            const userHasRated = userState.ratings.some(element => {
                if (element.imdbID === media.imdbID) {
                    return true
                }
            })

            const userRatedMedia = userState.ratings.find(element => {
                return element.imdbID == media.imdbID
            })

            if (userHasRated && userRatedMedia != undefined) {
                return (
                    <React.Fragment>
                        <Grid item direction="row">
                            <Grid container direction="row">
                                <Grid item pt={0.3}>
                                    <Rating readOnly precision={0.5} value={media.Ratings.avg} />
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ paddingLeft: 1 }} variant="overline">{media.Ratings.avg}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item direction="row">
                            <Grid container columnSpacing={1} direction="row">
                                <Grid item>
                                    <Typography sx={{ paddingLeft: 1 }} variant="overline">Your Rating</Typography>
                                </Grid>
                                <Grid item pt={0.3}>
                                    <Rating precision={0.5} value={userRatedMedia.rating} onChange={handleRatingUpdate} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )
            }
            else {
                return (
                    <React.Fragment>
                        <Grid item container direction="row">
                            <Grid item pt={0.3}>
                                <Rating precision={0.5} value={media.Ratings.avg} onChange={handleChange} />
                            </Grid>
                            <Grid item>
                                <Typography sx={{ paddingLeft: 1 }} variant="overline">{media.Ratings.avg}</Typography>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )
            }
        }
        else {
            return (
                <React.Fragment>
                    <Grid item container direction="row">
                        <Grid item pt={0.3}>
                            <Rating readOnly precision={0.5} value={media.Ratings.avg} />
                        </Grid>
                        <Grid item>
                            <Typography sx={{ paddingLeft: 1 }} variant="overline">{media.Ratings.avg}</Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            {userStateRating()}
        </React.Fragment>
    );
}