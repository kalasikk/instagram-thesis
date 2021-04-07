import React , {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {NavBarListItems} from '../../commons/NavBarListItems/NavBarListItems';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch } from 'react-redux';
import { setSideMenuItem } from '../../../store/actionCreators/setSideMenuItem';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1,
    },
    titleLink: {
        color: "#fff",
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        width: theme.spacing(7),
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    fixedHeight: {
        height: 240
    },
    orange: {
        color: '#fff',
        backgroundColor: 'orange'
    },
    avatarWrapper: {
        margin: '0 1rem',
    },
    avatarContent: {
        display: 'flex',
        flexDirection: 'column',
        margin: '1rem'
    },
    logInButton: {
        marginLeft: '1rem',
    }
}));

export function Bar({open, setOpen, handle_logout, userData}) {
    const classes = useStyles();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    // Popover settings

    const [anchorEl, setAnchorEl] = useState(null);

    const [popoverId, setPopoverId] = useState(null)

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverId('profile-popover')
    setIsOpen(true)
    };

    const handleProfilePopoverClose = () => {
    setAnchorEl(null);
    setPopoverId(null)
    setIsOpen(false)
    };

    const dispatch = useDispatch();
    const onAppTitleClick = () => {
        dispatch(setSideMenuItem(""))
    }

    return (
        <>
            <CssBaseline/>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="initial"
                        noWrap
                        className={classes.title}>
                        <Link className={classes.titleLink} to="/" onClick={onAppTitleClick}>Instagram Tracker</Link>
                    </Typography>
                    {!userData.loggedIn && <Button variant="contained">
                        <Link to="/signUp">Sign Up</Link>
                    </Button>}
                    {!userData.loggedIn &&
                    <Button className={classes.logInButton} variant="contained" color="secondary">
                        <Link to="/login">Log In</Link>
                    </Button>}
                    {userData.loggedIn &&
                    <div className={classes.avatarWrapper}>
                        <Avatar aria-describedby={popoverId} className={classes.orange} onClick={handleClick}>
                            NK
                        </Avatar>
                        <Popover
                            id={popoverId}
                            open={isOpen}
                            anchorEl={anchorEl}
                            onClose={handleProfilePopoverClose}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                        >
                    <div className={classes.avatarContent}>
                        <h3>Profile Info</h3>
                        <p>Group: {userData.group} </p>
                        <Button onClick={handle_logout} variant="contained" color="error">
                        Log Out
                    </Button>
                    </div>
                </Popover>
                    </div>}
                </Toolbar>
            </AppBar>
        </>
    );
}