import { AppBar, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Toolbar } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Link from "next/link";
import {Button} from "@mui/material";
import {useAppSelector} from "../app/hooks";
import {useAppDispatch} from "../app/hooks";
import {logoutUser} from "../app/actions/logoutUser"
import LogoutIcon from "@mui/icons-material/Logout"
import { Menu, MenuItem, ListItemIcon, ListItemText, Tooltip, IconButton, Avatar } from '@mui/material'
import React from 'react';
import { useState } from 'react'
import axios from "axios";
import SettingsIcon from '@mui/icons-material/Settings';

import ClickAwayListener from '@mui/material/ClickAwayListener';

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

export default function Navigation() {
    const dispatch = useAppDispatch()
    const userState = useAppSelector((state) => state);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        dispatch(logoutUser())
    };

    const userButtons = () => {
        if (!userState.loggedIn) {
            console.log(userState)
            return (
                <React.Fragment>
                    <Grid item mx={1}>
                        <Link href="/login" passHref>
                            <Button variant="contained" color="success">Log In</Button>
                        </Link>
                    </Grid>
                    <Grid item mx={1}>
                        <Link href="/signup" passHref>
                            <Button variant="outlined" color="success">Sign Up</Button>
                        </Link>
                    </Grid>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    {userState.type === 'admin' &&
                        <Link href="/manage" passHref>
                            <IconButton>
                                <SettingsIcon />
                            </IconButton>
                        </Link>
                    }
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>{userState.username.charAt(0)}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                    >
                        <MenuItem>
                            <Button onClick={logout} color="error">
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography>Log out</Typography>
                                </ListItemText>
                            </Button>
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            )
        }
    }
    const [data, setData] = useState([]);
    const [searchVisible, setSearchVisibility] = useState<boolean>(true);
  
    const inputHandler = (e: any) => {
        if (e.target.value.length === 0) {
            return
        }
        axios.get(`https://watcheddit-ljy5gpprra-uc.a.run.app/api/media-search/${e.target.value}`)
            .then((res) => {
                console.log(res)
                setData(res.data)
                showSearch()
            })
            .catch((err) => {
                console.log(err)
                setData([])
                hideSearch()
            })
    };

    function hideSearch() {
        setData([])
        setSearchVisibility(false)
    }

    function showSearch() {
        setSearchVisibility(true)
    }

    return (
        <AppBar sx={{backgroundColor: 'white'}} position='sticky'>
            <Toolbar>
                <Grid container direction="row">
                    <Grid item justifyContent="center" direction="column" display="flex">
                        <Link href="/" passHref>
                            <Typography sx={{color: 'black'}}>Watcheddit</Typography>
                        </Link>
                    </Grid>
                    <ClickAwayListener onClickAway={hideSearch}>
                        <Grid item>
                            <Search onChange={inputHandler} onClick={showSearch}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    sx={{ color: 'black' }}
                                    placeholder="Search"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                            <div style={{
                                position: "absolute",
                                background: "#242424",
                                overflowY: "scroll",
                                maxHeight: "400px",
                                visibility: searchVisible ? "visible" : "hidden"
                            }}>
                                {data.map((media: any) => {
                                    return (
                                        <Grid key={media.imdbID} container direction="row" height="100px" mb={3}>
                                            <Grid item height="100px" padding="1em">
                                                <Link href={`/${encodeURIComponent(media.imdbID)}`} passHref>
                                                    <CardMedia onClick={hideSearch} component="img" image={media.Poster} height="100px" />
                                                </Link>
                                            </Grid>
                                            <Grid item sm padding="1em">
                                                <Grid container direction="column">
                                                    <Grid item>
                                                        <Typography variant="h5">{media.Title}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle2">{media.Genre}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography sx={{
                                                            width: '20em'
                                                        }} noWrap={true} variant="body1">{media.Plot}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="caption">{media.Year}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                            </div>
                        </Grid>
                    </ClickAwayListener>
                    <Grid sm item />
                    {userButtons()}
                </Grid>
            </Toolbar>
        </AppBar>
    );
}