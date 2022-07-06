import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { updateUser } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from '../../store/user/user.selector';
import { setCurrentUser } from '../../store/user/user.action';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { IconContainer } from '../DisplaySongsTable/DisplaySongRow/DisplaySongRow.styles';

const FavIcon = ({ active, song, id, icon }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    let params = useParams();

    const clickHandler = () => {
        if (!currentUser.myFavSongs.includes(id)) {
            console.log('!');
            updateUser(currentUser.uid, { myFavSongs: [...currentUser.myFavSongs, id] });
            dispatch(setCurrentUser({ ...currentUser, myFavSongs: [...currentUser.myFavSongs, id] }));
        } else {
            console.log('else');
            const removedFromFav = currentUser.myFavSongs.filter(song => song !== id);
            updateUser(currentUser.uid, { myFavSongs: removedFromFav });
            dispatch(setCurrentUser({ ...currentUser, myFavSongs: removedFromFav }));
        }
    };

    return (
        <>
            {currentUser.myFavSongs && currentUser.myFavSongs.includes(id) ? (
                <IconContainer>
                    <FavoriteIcon style={{ color: '#416a59' }} onClick={clickHandler} />
                </IconContainer>
            ) : (
                <IconContainer>
                    <FavoriteBorderIcon color="action" onClick={clickHandler} />
                </IconContainer>
            )}
        </>
    );
};

export default FavIcon;
