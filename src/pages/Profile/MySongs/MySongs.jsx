import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSongs } from '../../../store/songs/songs.selector';
import { selectCurrentUser } from '../../../store/user/user.selector';

import AddBoxIcon from '@mui/icons-material/AddBox';

import { MySongsContainer, NoSongNotification, BoxIcon } from './MySongs.styles';
import DisplaySongsTable from '../../../components/DisplaySongsTable';

const MySongs = () => {
    const currentUser = useSelector(selectCurrentUser);
    const allSongs = useSelector(selectSongs);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const usersSongs = allSongs.filter(song => song.addedBy === currentUser.uid);
        setSongs(usersSongs);
    }, [allSongs, currentUser]);

    useEffect(() => {
        console.log(songs);
    }, [songs]);

    return (
        <MySongsContainer>
            {songs ? (
                <DisplaySongsTable data={songs} />
            ) : (
                <NoSongNotification>
                    <Link to="/add-song">
                        <AddBoxIcon />
                        <p>Add some new songs to display them here</p>
                    </Link>
                </NoSongNotification>
            )}
        </MySongsContainer>
    );
};

export default MySongs;
