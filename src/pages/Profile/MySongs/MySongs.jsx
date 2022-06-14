import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SongCardPreview from '../../../components/SongCardPreview/SongCardPreview';
import { selctUsersSongs } from '../../../store/songs/songs.selector';

const MySongs = () => {
    const currentUsersSongs = useSelector(selctUsersSongs);
    const [usersSongs, setUsersSongs] = useState([]);

    useEffect(() => {
        setUsersSongs(currentUsersSongs);
    }, [currentUsersSongs]);

    return (
        <>
            {usersSongs ? (
                usersSongs.map(song => <SongCardPreview song={song} />)
            ) : (
                <p>Add songs to display them here</p>
            )}
        </>
    );
};

export default MySongs;
