import { Grid, FormControl, TextField, Button, Paper } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '../app/hooks'

const defaultFormValues = {
    text: "",
}

export default function CommentForm() {
    const [formValues, setFormValues] = useState(defaultFormValues)
    const router = useRouter();
    const { mediaID, postID } = router.query
    const username = useAppSelector((state) => state.username)

    const handleChange = (event: any) => {
        setFormValues({
            ...formValues,
            text: event.target.value
        })
    }

    const handleClick = () => {
        const comment = {
            user: username,
            text: formValues.text,
            postID: postID
        }

        axios.post(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/comment/${postID}/add`, comment, { withCredentials: true })
            .then((response) => {
                router.push(`/${mediaID}/${postID}`)
            }, 
                (error) => {
                    console.log(error)
                })

        setFormValues({
            ...formValues,
            text: ""
        })

    }

    return (
        <Paper>
            <Grid container p={2} direction="row" columnSpacing={2} alignItems="center">
                <Grid item xs>
                    <TextField fullWidth name="text" label="Comment" value={formValues.text} onChange={handleChange} />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleClick} color="success" type="submit">Add</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}