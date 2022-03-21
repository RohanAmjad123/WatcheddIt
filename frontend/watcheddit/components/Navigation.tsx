import { AppBar } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Toolbar } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Link from "next/link";
import { Button } from "@mui/material";

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
    return (
        <AppBar sx={{ bgcolor: 'black' }} position='sticky'>
            <Toolbar>
                <Grid container direction="row">
                    <Link href="/" passHref>
                        <Grid item justifyContent="center" direction="column" display="flex">
                            <Typography sx={{ color: 'text.primary' }}>Watcheddit</Typography>
                        </Grid>
                    </Link>
                    <Grid item>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Grid>
                    <Grid sm item/>
                    <Link href="/login" passHref>
                        <Grid item mx={1}>
                            <Button variant="outlined">Log In</Button>
                        </Grid>
                    </Link>
                    <Link href="/signup" passHref>
                        <Grid item mx={1}>
                            <Button variant="outlined">Sign Up</Button>
                        </Grid>
                    </Link>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}