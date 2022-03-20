import { FormControl, Grid, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const defaultSignupValues = {
    username: "",
    password: ""
}

export default function SignupForm () {
    const router = useRouter();

    const [formValues, setFormValues] = useState(defaultSignupValues);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };  

    const handleClick = (event: any) => {
        console.log(formValues);
        axios.post('http://localhost:3000/api/signup', formValues)
        .then((response) => {
            console.log('Successful signup')
            router.push('/login')
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <FormControl>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <TextField required name="username" onChange={handleChange} label="Username" />
                </Grid>
                <Grid item>
                    <TextField required type="password" name="password" onChange={handleChange} label="Password" />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleClick}>Sign Up</Button>
                </Grid>
            </Grid>
        </FormControl>
    );
}