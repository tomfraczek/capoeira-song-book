import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateUser, getUsersFromDb } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from '../../store/user/user.selector';
import { setCurrentUser } from '../../store/user/user.action';

import CategoryBadge from '../CategoryBadge/CategoryBadge';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { CardTitile, CardContainer, LyricsParagraph } from './SongCardPreview.styles';

const SongCardPreview = ({ song, fav }) => {
    const [user, setUser] = useState(null);
    const { category, createdAt, lyrics, title } = song;
    const dispatch = useDispatch();

    // maybe for later use
    // const boldString = (str, strToFind) => str.replaceAll(strToFind, `<b>${strToFind}</b>`);
    // const substring = (str, length) => str.substring(0, length);

    const { id } = song;
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    // useEffect(() => {
    //     const users = async () => {
    //         const foo = await getUsersFromDb();
    //         console.log(foo);
    //         return foo;
    //     };
    //     users();
    // }, []);

    const clickHandler = () => {
        const favSongs = currentUser.myFavSongs;
        console.log(currentUser);

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
            return <FavoriteIcon onClick={clickHandler} />;
        }

        return <FavoriteBorderIcon onClick={clickHandler} />;
    };

    return (
        <CardContainer>
            <Link to={`song/${id}`}>
                <CardTitile>{title}</CardTitile>
            </Link>
            <IconHandler />

            <CategoryBadge>{category}</CategoryBadge>
            <LyricsParagraph>{lyrics['lyrics-1-a']}</LyricsParagraph>
            <LyricsParagraph>{lyrics['lyrics-1-b']}</LyricsParagraph>
            <Link to={`song/${id}`}>View Song</Link>
        </CardContainer>
    );
};

export default SongCardPreview;
