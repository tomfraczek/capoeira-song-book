import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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

import DashboardIcon from '@mui/icons-material/Dashboard';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';

import { selectUsersPlaylists } from '../../store/user/user.selector';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const drawerWidth = 240;

const DrawerMenu = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        icon: <DashboardIcon />,
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

const ButtonStyle = {
    color: '#416a59',
};

const ProfileDrawer = () => {
    const playlists = useSelector(selectUsersPlaylists);

    useEffect(() => {
        console.log(playlists);
    }, [playlists]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'transparent',
                        border: 'none',
                        top: '80px',
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    {DrawerMenu.map(({ name, path, icon, active }, i) => (
                        <Link to={active ? path : '#'} key={i} style={{ cursor: 'not-allowed' }}>
                            <ListItem key={name} disablePadding style={ButtonStyle}>
                                <ListItemButton disabled={!active}>
                                    <ListItemIcon>{icon}</ListItemIcon>
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
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={name} style={ButtonStyle} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                    <ListItemButton>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create new playlist" style={ButtonStyle} />
                    </ListItemButton>
                </List>
            </Drawer>
        </Box>
    );
};

export default ProfileDrawer;
