import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DisplaySongsTable from '../../../components/DisplaySongsTable';
import SongCardPreview from '../../../components/SongCardPreview';
import { selectSongs } from '../../../store/songs/songs.selector';
import { selectCurrentUser, selectUsersFavSongs } from '../../../store/user/user.selector';

import { NoSongNotification, MyFavoritesContainer } from './MyFavorites.styles';

import AddBoxIcon from '@mui/icons-material/AddBox';

const MyFavorites = () => {
    const [usersFavSongs, setUsersFavSongs] = useState([]);
    const currentUser = useSelector(selectCurrentUser);
    const songs = useSelector(selectSongs);
    const favSongs = useSelector(selectUsersFavSongs);
    const [user, setUser] = useState(null);
    const [fav, setFav] = useState([]);

    useEffect(() => {
        if (favSongs) {
            console.log(songs.filter(song => favSongs.includes(song.id)));
        }
    }, [songs, favSongs]);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    useEffect(() => {
        if (user) {
            const favSongs = songs.filter(song => user.myFavSongs.includes(song.id));
            setFav(favSongs);
        }
    }, [user]);

    useEffect(() => {
        console.log(fav);
    }, [fav]);

    return (
        <MyFavoritesContainer>
            {fav.length ? (
                <DisplaySongsTable data={fav} />
            ) : (
                <NoSongNotification>
                    <Link to="/songbook">
                        <AddBoxIcon />
                        <p>You have no favorite songs. Add some to display them here.</p>
                    </Link>
                </NoSongNotification>
            )}
        </MyFavoritesContainer>
    );
};

export default MyFavorites;
