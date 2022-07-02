import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { updateUser, getUsersFromDb } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from '../../store/user/user.selector';
import { setCurrentUser } from '../../store/user/user.action';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const FavIcon = ({ active, song }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const favSongs = currentUser.myFavSongs;
    const { id } = song;
    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);

    const clickHandler = () => {
        // console.log(favSongs);

        if (!favSongs.includes(id)) {
            updateUser(currentUser.uid, { myFavSongs: [...favSongs, song.id] });
            dispatch(setCurrentUser({ ...currentUser, myFavSongs: [...favSongs, id] }));
        } else {
            const removedFromFav = favSongs.filter(song => song !== id);
            updateUser(currentUser.uid, { myFavSongs: removedFromFav });
            dispatch(setCurrentUser({ ...currentUser, myFavSongs: removedFromFav }));
        }
    };

    return (
        <>
            {favSongs.includes(id) ? (
                <FavoriteIcon style={{ color: '#416a59' }} onClick={clickHandler} />
            ) : (
                <FavoriteBorderIcon color="action" onClick={clickHandler} />
            )}
        </>
    );
};

export default FavIcon;
