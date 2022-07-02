import * as React from 'react';
import { useState, useEffect } from 'react';
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

import { updateSongDb } from '../../../utils/firebase/firebase.utils';

import DisplayLyrics from '../../DisplayLyrics';
import HalfRating from '../../HalfRating';
import FavIcon from '../../FavIcon';

const DisplaySongRow = ({ song }) => {
    const [open, setOpen] = useState(false);
    const { title, id, addedBy, createdAt, category } = song;

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
                    <HalfRating handleRating={handleRating} />
                </TableCell>
                <TableCell align="left">{category}</TableCell>
                <TableCell align="right">{createdAt.seconds}</TableCell>
                <TableCell align="left">{addedBy}</TableCell>
                <TableCell align="right">
                    <OpenInNewIcon />
                    <FavIcon song={song} />
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
