import { Grid, Typography, Paper } from '@mui/material'
import { useState, useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import router from 'next/router'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material'
import axios from 'axios'
import { Media } from '../interfaces'
import { CardMedia } from '@mui/material'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "grey"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const apiBase = 'https://www.omdbapi.com/?apikey=33ec892d&t='

const defaultMedia = {
    Title: "",
    Poster: "",
    Plot: "",
    Year: "",
    Genre: "",
    Ratings: {
        avg: 0,
        total: 0
    },
    imdbID: ""
}

export default function Manage() {
    const [showSearch, setShowSearch] = useState(false)
    const [searchFieldValue, setSearchFieldValue] = useState("")
    const [media, setMedia] = useState<Media>(defaultMedia)

    const handleChange = (event: any) => {
        let movieTitle = event.target.value
        movieTitle = movieTitle.toLowerCase().trim().replace(/\s+/g, '+')
        setSearchFieldValue(movieTitle);
    }

    useEffect(() => { }, [showSearch])

    const handleClick = () => {
        const url = apiBase + searchFieldValue
        console.log(url)
        axios.get(url)
            .then((res) => {
                if (res.data['Title'] !== undefined) {
                    setMedia({
                        Title: res.data['Title'],
                        Poster: res.data['Poster'],
                        Plot: res.data['Plot'],
                        Year: res.data['Year'],
                        Genre: res.data['Genre'],
                        Ratings: {
                            avg: 0,
                            total: 0
                        },
                        imdbID: res.data['imdbID']
                    })
                    setShowSearch(true)
                }
                else {
                    setMedia(defaultMedia)
                    setShowSearch(false)
                }
            }, (err) => {
                console.log(err)
            })
    }

    const handleAdd = () => {
        axios.post('https://watcheddit-ljy5gpprra-uc.a.run.app/api/media/add', media, { withCredentials: true })
        .then((response) => {
            setShowSearch(false)
        }, (err) => {
            console.log(err)
        })
    }

    return (
        <Paper>
            <Grid container p={3} direction="column">
                <Grid item>
                    <Typography variant="h4">Add Media</Typography>
                </Grid>
                <Grid item container pt={3} direction="row">
                    <Grid item>
                        <Search onChange={handleChange}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                sx={{ color: 'black' }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleClick} color="success" variant="contained">Search</Button>
                    </Grid>
                </Grid>
                <Grid item container pt={3} >
                    <Grid item>
                        {showSearch &&
                            <Grid container direction="row" alignItems="center">
                                <Grid item container direction="row" height="200px">
                                    <Grid item>
                                        <CardMedia component="img" image={media.Poster} height="200px" />
                                    </Grid>
                                    <Grid item sm>
                                        <Grid container direction="column" p={3}>
                                            <Grid item>
                                                <Typography variant="h4">{media.Title}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2">{media.Genre}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">{media.Plot}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="caption">{media.Year}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item pt={2}>
                                    <Button onClick={handleAdd} variant="contained" color="success">Add</Button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}