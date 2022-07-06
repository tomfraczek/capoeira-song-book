import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SongCardPreview from '../../../components/SongCardPreview/SongCardPreview';
import { selectUsersSongs } from '../../../store/songs/songs.selector';

import AddBoxIcon from '@mui/icons-material/AddBox';

import { MySongsContainer, NoSongNotification, BoxIcon } from './MySongs.styles';

const MySongs = () => {
    const currentUsersSongs = useSelector(selectUsersSongs);
    const [usersSongs, setUsersSongs] = useState([]);

    useEffect(() => {
        setUsersSongs(currentUsersSongs);
    }, [currentUsersSongs]);

    useEffect(() => {
        console.log(currentUsersSongs);
    }, [usersSongs]);

    return (
        <MySongsContainer>
            {currentUsersSongs.length ? (
                currentUsersSongs.map((song, i) => <SongCardPreview song={song} key={i} />)
            ) : (
                <NoSongNotification>
                    <Link to="add-song">
                        <AddBoxIcon />
                        <p>Add some new songs to display them here</p>
                    </Link>
                </NoSongNotification>
            )}
        </MySongsContainer>
    );
};

export default MySongs;
