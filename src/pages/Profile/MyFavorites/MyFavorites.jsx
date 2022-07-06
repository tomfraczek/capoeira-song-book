import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DisplaySongsTable from '../../../components/DisplaySongsTable';
import SongCardPreview from '../../../components/SongCardPreview';
import { selectSongs } from '../../../store/songs/songs.selector';
import { selectCurrentUser, selectUsersFavSongs } from '../../../store/user/user.selector';

const MyFavorites = () => {
    const [usersFavSongs, setUsersFavSongs] = useState([]);
    const currentUser = useSelector(selectCurrentUser);
    const songs = useSelector(selectSongs);
    const favSongs = useSelector(selectUsersFavSongs);

    useEffect(() => {
        // console.log(favSongs);
        // const foo = songs.data.filter(song => currentUser.myFavSongs.map(favSong => song.id === favSong));
        setUsersFavSongs(songs.filter(song => favSongs.includes(song.id)));
    }, [currentUser, songs, favSongs]);

    useEffect(() => {
        console.log(usersFavSongs);
    }, [usersFavSongs]);

    return (
        <div>
            <DisplaySongsTable data={usersFavSongs} />
        </div>
    );
};

export default MyFavorites;
