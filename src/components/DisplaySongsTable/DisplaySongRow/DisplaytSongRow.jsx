import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import {
    updateSongDb,
    getUserById,
    onAuthStateChangedListener,
} from '../../../utils/firebase/firebase.utils';

import DisplayLyrics from '../../DisplayLyrics';
import CategoryBadge from '../../CategoryBadge';
import HalfRating from '../../HalfRating';
import FavIcon from '../../FavIcon';

import { IconContainer } from './DisplaySongRow.styles';

const DisplaySongRow = ({ song }) => {
    const [open, setOpen] = useState(false);
    const [author, setAuthor] = useState({});
    const [isUserLogged, setIsUserLogged] = useState(false);
    const navigate = useNavigate();
    const { title, id, addedBy, createdAt, category } = song;

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => {
            if (user) {
                setIsUserLogged(true);
            }
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const updateUserDb = async () => {
            const user = await getUserById(addedBy);
            setAuthor(user);
        };

        updateUserDb();
    }, []);

    const handleRating = e => {
        try {
            const updateProfile = async () => {
                const newRate = e.target.value;
                const ratingToAdd = {
                    rating: Number(newRate) + (!song.rating && 0),
                };
                await updateSongDb(song.id, ratingToAdd);
                // dispatch(setCurrentUser(formFields));
            };

            // const updateUserDb = onAuthStateChangedListener(user => {
            //     updateUser(user.uid, { displayName });
            // });

            updateProfile();
            // updateUserDb();
        } catch (error) {
            console.log('user edit encontered an error', error.message);
        }
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{title}</TableCell>
                <TableCell align="left">
                    <CategoryBadge category={category} />
                </TableCell>
                <TableCell align="left">
                    <HalfRating readOnly handleRating={handleRating} value={song.rating} />
                </TableCell>
                <TableCell align="right">{createdAt}</TableCell>
                <TableCell align="left">{author.displayName}</TableCell>
                <TableCell align="right">
                    <IconContainer>
                        <OpenInNewIcon onClick={() => navigate(`song/${song.id}`)} />
                    </IconContainer>
                    {/* {isUserLogged && <FavIcon song={song} />} */}
                </TableCell>
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Preview
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <DisplayLyrics song={song} />
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default DisplaySongRow;
