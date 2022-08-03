import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

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
        const updateUserDb = async () => {
            const user = await getUserById(addedBy);
            setAuthor(user);
        };

        updateUserDb();
        return unsubscribe;
    }, []);

    const roundHalf = n => {
        if (isNaN(n)) {
            return 0;
        }
        return (Math.round(n * 2) / 2).toFixed(1);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              
                <TableCell align="left">{title}</TableCell>
                <TableCell align="left">
                    <CategoryBadge category={category} />
                </TableCell>
                <TableCell align="left">
                    <HalfRating readOnly value={roundHalf(song.rating.score / song.rating.votes)} />
                </TableCell>
                <TableCell align="right">{createdAt}</TableCell>
                <TableCell align="left">{author.displayName}</TableCell>
                <TableCell align="right">
                    <IconContainer>
                        <OpenInNewIcon onClick={() => navigate(`/songbook/song/${song.id}`)} />
                    </IconContainer>
                    {isUserLogged && <FavIcon song={song} id={id} />}
                </TableCell>
                <TableCell />
            </TableRow>
           
        </React.Fragment>
    );
};

export default DisplaySongRow;
