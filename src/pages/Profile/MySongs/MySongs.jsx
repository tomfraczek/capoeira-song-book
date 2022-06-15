import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SongCardPreview from '../../../components/SongCardPreview/SongCardPreview';
import { selectUsersSongs } from '../../../store/songs/songs.selector';

import { MySongsContainer } from './MySongs.styles';

const MySongs = () => {
    const currentUsersSongs = useSelector(selectUsersSongs);
    const [usersSongs, setUsersSongs] = useState([]);

    useEffect(() => {
        setUsersSongs(currentUsersSongs);
    }, [currentUsersSongs]);

    return (
        <MySongsContainer>
            {usersSongs ? (
                usersSongs.map((song, i) => <SongCardPreview song={song} key={i} />)
            ) : (
                <p>Add songs to display them here</p>
            )}
        </MySongsContainer>
    );
};

export default MySongs;
