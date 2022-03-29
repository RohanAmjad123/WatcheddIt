import { Grid } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { FormControl } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useAppDispatch } from '../app/hooks'
import { logoutUser } from "../app/actions/logoutUser";
import { useAppSelector } from '../app/hooks'

const defaultPostValues = {
    title: "",
    description: "",
    user: "",
    imdbID: ""
}

export default function PostForm({ mediaID }: { mediaID: any }) {
    const imdbID = mediaID;
    const router = useRouter();
    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.username);

    const [formValues, setFormValues] = useState(defaultPostValues);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };  

    const handleClick = () => {
        formValues.imdbID = mediaID;
        formValues.user = username;

        console.log(formValues);

        axios.post('https://watcheddit-ljy5gpprra-uc.a.run.app/api/post/add', formValues, { withCredentials: true })
        
        .then((response) => {
            router.push(`/${imdbID}`);
        }, (error) => {
            if (error.response.status === 401) {
                dispatch(logoutUser());
                router.push('/login')
            }
            console.log(error);
        }) 
    };

    return (
        <FormControl>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <TextField name="title" label="Title" value={formValues.title} onChange={handleChange} />
                </Grid>
                <Grid item>
                    <TextField name="description" label="Description" value={formValues.description} onChange={handleChange} />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleClick} color="success">Post</Button>
                </Grid>
            </Grid>
        </FormControl>
    );
}