import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { selectUsersPlaylists } from '../../store/user/user.selector';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { setCurrentUser } from '../../store/user/user.action';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import { Paper } from '@mui/material';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

const drawerWidth = 260;

const DrawerMenu = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        icon: <DashboardIcon />,
        active: true,
    },
    {
        name: 'Songbook',
        path: 'songbook',
        icon: <MusicNoteIcon />,
        active: true,
    },
    {
        name: 'My Songs',
        path: 'my-songs',
        icon: <LibraryMusicIcon />,
        active: true,
    },
    {
        name: 'Notifications',
        path: 'notifications',
        icon: <NotificationsIcon />,
        active: false,
    },
    {
        name: 'Edit Profile',
        path: 'edit-profile',
        icon: <AccountBoxIcon />,
        active: true,
    },
    {
        name: 'Add New Song',
        path: 'new-song',
        icon: <AddCircleIcon />,
        active: true,
    },
];

const DrawerSubmenu = [
    {
        name: 'Favorites',
        path: 'favorites',
        icon: <BookmarkIcon />,
        active: true,
    },
];

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = theme => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const ButtonStyle = {
    color: '#416a59',
};

const UserDrawer = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);

    let navigate = useNavigate();

    const handleDrawerToggle = () => {
        setOpen(prevState => !prevState);
    };

    const handleLogOut = () => {
        signOutUser();
        dispatch(setCurrentUser(null));
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    position: 'relative',
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#fff',
                        border: 'none',
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        paddingRight: '20px',
                        position: 'unset',
                    },
                }}
                variant="permanent"
                anchor="left"
                open={open}
            >
                {/* <DrawerHeader style={{ minWidth: '42px' }}>
                    
                </DrawerHeader> */}
                <List>
                    <ListItemButton onClick={handleDrawerToggle} style={{ position: 'relative' }}>
                        <ListItemIcon style={{ color: '#416a59' }}>
                            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </ListItemIcon>
                        <ListItemText primary="Drawer" style={ButtonStyle} />
                    </ListItemButton>
                    {DrawerMenu.map(({ name, path, icon, active }, i) => (
                        <Link to={active ? path : '#'} key={i} style={{ cursor: 'not-allowed' }}>
                            <ListItem key={name} disablePadding style={ButtonStyle}>
                                <ListItemButton disabled={!active}>
                                    <ListItemIcon style={{ color: '#416a59' }}>{icon}</ListItemIcon>
                                    <ListItemText primary={name} style={ButtonStyle} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>

                <Divider />

                <List>
                    {DrawerSubmenu.map(({ name, path, icon }, i) => (
                        <Link to={path} key={i}>
                            <ListItem key={name} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon style={{ color: '#416a59' }}>{icon}</ListItemIcon>
                                    <ListItemText primary={name} style={ButtonStyle} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                    <ListItemButton>
                        <ListItemIcon style={{ color: '#416a59' }}>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create new playlist" style={ButtonStyle} />
                    </ListItemButton>
                    <ListItemButton onClick={handleLogOut}>
                        <ListItemIcon style={{ color: '#416a59' }}>
                            <MeetingRoomOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" style={ButtonStyle} />
                    </ListItemButton>
                </List>
            </Drawer>
        </Box>
    );
};

export default UserDrawer;
