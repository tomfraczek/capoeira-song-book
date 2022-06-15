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

const drawerWidth = 240;

const DrawerMenu = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        icon: <DashboardIcon />,
    },
    {
        name: 'Favorites',
        path: 'favorites',
        icon: <SaveAltIcon />,
    },
    {
        name: 'My Songs',
        path: 'my-songs',
        icon: <LibraryMusicIcon />,
    },
    {
        name: 'Notifications',
        path: 'notifications',
        icon: <NotificationsIcon />,
    },
    {
        name: 'Edit Profile',
        path: 'edit-profile',
        icon: <AccountBoxIcon />,
    },
];

const ProfileDrawer = () => {
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
                    {DrawerMenu.map(({ name, path, icon }, i) => (
                        <Link to={path} key={i}>
                            <ListItem key={name} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                {/* <List>
                    {['Edit Profile', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
            </Drawer>
        </Box>
    );
};

export default ProfileDrawer;
