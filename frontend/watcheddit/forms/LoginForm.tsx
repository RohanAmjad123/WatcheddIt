import { FormControl, Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppDispatch } from "../app/hooks"
import { loginUser } from "../app/actions/loginUser"
import { User } from '../interfaces/index'

const defaultLoginValues = {
    username: "",
    password: ""
}

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const [formValues, setFormValues] = useState(defaultLoginValues);
    const [incorrectUsername, setIncorrectUsername] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);

    const handleChange = (event: any) => {
        setIncorrectUsername(false)
        setIncorrectPassword(false)
        const { name, value } = event.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClick = async (event: any) => {
        let username: string
        let type: string
        let ratings: User["ratings"]
        let votes: User['votes'] 
        var successfulLogin = false

        await axios.post('https://watcheddit-ljy5gpprra-uc.a.run.app/api/login', formValues, { withCredentials: true })
            .then((response) => {
                username = response.data.username
                type = response.data.type
                successfulLogin = true
                setIncorrectUsername(false)
                setIncorrectPassword(false)
            }, (error) => {
                if (error.response.data === "No matching username found") {
                    setIncorrectUsername(true)
                } else if (error.response.data === "Wrong password") {
                    setIncorrectPassword(true)
                }
                console.log(error)
            })
            
        if (successfulLogin) {
            await axios.get('https://watcheddit-ljy5gpprra-uc.a.run.app/api/myratings', { withCredentials: true })
                .then((response) => {
                    ratings = response.data
                    console.log(response)
                }, (error) => {
                    console.log(error)
                })

            axios.get('https://watcheddit-ljy5gpprra-uc.a.run.app/api/myvoted', { withCredentials: true })
            .then((response) => {
                console.log(response)
                votes = response.data
                const dispatchValues = {
                    username: username,
                    type: type,
                    ratings: ratings,
                    votes: votes
                }
                console.log(response)
                dispatch(loginUser(dispatchValues));
                router.push('/')
            }, (err) => {
                console.log(err)
            })

        }
    }

    return (
        <FormControl>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <TextField error={incorrectUsername} helperText={incorrectUsername ? "Incorrect username" : "" } required name="username" onChange={handleChange} label="Username" autoComplete="username" autoFocus />
                </Grid>
                <Grid item>
                    <TextField error={incorrectPassword} helperText={incorrectPassword ? "Incorrect password" : "" } required type="password" name="password" onChange={handleChange} label="Password" autoComplete="current-password" />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleClick} color="success">Log in</Button>
                </Grid>
            </Grid>
        </FormControl>
    );
}