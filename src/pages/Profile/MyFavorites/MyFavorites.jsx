import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SongCardPreview from '../../../components/SongCardPreview/SongCardPreview';
import { selectSongs } from '../../../store/songs/songs.selector';
import { selectCurrentUser, selectUsersFavSongs } from '../../../store/user/user.selector';

const MyFavorites = () => {
    const [usersFavSongs, setUsersFavSongs] = useState([]);
    const currentUser = useSelector(selectCurrentUser);
    const songs = useSelector(selectSongs);
    const favSongs = useSelector(selectUsersFavSongs);

    useEffect(() => {
        // console.log(currentUser);
        // const foo = songs.data.filter(song => currentUser.myFavSongs.map(favSong => song.id === favSong));
        setUsersFavSongs(songs.filter(song => favSongs.includes(song.id)));
    }, [currentUser, songs, favSongs]);

    return (
        <div>
            {usersFavSongs.map(song => (
                <SongCardPreview song={song} />
            ))}
        </div>
    );
};

export default MyFavorites;
