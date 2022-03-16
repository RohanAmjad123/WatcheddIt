import { Grid } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { FormControl } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

const defaultPostValues = {
    title: "",
    description: "",
    user: 1,
    imdbID: "",
}

export default function PostForm({ mediaID }: { mediaID: any }) {
    const imdbID = mediaID;
    const router = useRouter();

    const [formValues, setFormValues] = useState(defaultPostValues);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };  

    const handleClick = (event: object) => {
        formValues.imdbID = mediaID;
        console.log(formValues);
        axios.post('http://localhost:3000/api/addPost', formValues)
        .then((response) => {
            console.log(response);
            router.push(`/${imdbID}`);
        }, (error) => {
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
                    <Button variant="contained" onClick={handleClick}>Post</Button>
                </Grid>
            </Grid>
        </FormControl>
    );
}