import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateUser, getUsersFromDb } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from '../../store/user/user.selector';
import { setCurrentUser } from '../../store/user/user.action';

import CategoryBadge from '../CategoryBadge';
import CustomButton from '../CustomButton';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { CardTitile, CardContainer, LyricsParagraph } from './SongCardPreview.styles';

const SongCardPreview = ({ song, fav }) => {
    const [user, setUser] = useState(null);
    const { category, createdAt, lyrics, title } = song;
    const dispatch = useDispatch();

    // maybe for later use
    // const boldString = (str, strToFind) => str.replaceAll(strToFind, `<b>${strToFind}</b>`);
    const foo = (str, length) => {
        console.log(str.substring(0, length));
        if (str.length < length) return str;

        return `${str.substring(0, length)}...`;
    };

    const { id } = song;
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    const clickHandler = () => {
        const favSongs = currentUser.myFavSongs;

        if (!favSongs.includes(id)) {
            updateUser(currentUser.uid, { myFavSongs: [...favSongs, id] });
            dispatch(setCurrentUser({ ...currentUser, myFavSongs: [...favSongs, id] }));
        } else {
            const removedFromFav = favSongs.filter(song => song !== id);
            updateUser(currentUser.uid, { myFavSongs: removedFromFav });
            dispatch(setCurrentUser({ ...currentUser, myFavSongs: removedFromFav }));
        }
    };

    const IconHandler = () => {
        if (fav) {
            return <FavoriteIcon style={{ color: '#416a59' }} onClick={clickHandler} />;
        }

        return <FavoriteBorderIcon color="action" onClick={clickHandler} />;
    };

    return (
        <CardContainer>
            <Link to={`song/${id}`}>
                <CardTitile>{title}</CardTitile>
            </Link>
            <IconHandler />

            <CategoryBadge>{category}</CategoryBadge>
            <LyricsParagraph>{foo(lyrics['lyrics-1-a'], 50)}</LyricsParagraph>
            <LyricsParagraph>{lyrics['lyrics-1-b'] && foo(lyrics['lyrics-1-b'], 50)}</LyricsParagraph>
            <CustomButton>
                <Link to={`song/${id}`}>View Song</Link>
            </CustomButton>
        </CardContainer>
    );
};

export default SongCardPreview;
