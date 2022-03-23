import { FormControl, Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppDispatch } from "../app/hooks"
import { loginUser } from "../app/actions/loginUser"

const defaultLoginValues = {
    username: "",
    password: ""
}

export default function LoginForm () {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const [formValues, setFormValues] = useState(defaultLoginValues);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };  

    const handleClick = (event: any) => {
        console.log(formValues);
        axios.post('http://localhost:3000/api/login', formValues, { withCredentials: true })
        .then((response) => {
            dispatch(loginUser({
                username: response.data.username,
                type: response.data.type
            }))
            router.push('/')
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
                    <Button variant="contained" onClick={handleClick}>Log in</Button>
                </Grid>
            </Grid>
        </FormControl>
    );
}