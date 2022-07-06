import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector';
import { setCurrentUser } from '../../store/user/user.action';

import CategoryBadge from '../CategoryBadge';
import CustomButton from '../CustomButton';
import FavIcon from '../FavIcon';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { CardTitile, CardContainer, LyricsParagraph } from './SongCardPreview.styles';

const SongCardPreview = ({ song, fav }) => {
    const [user, setUser] = useState(null);
    const { category, createdAt, lyrics, title } = song;

    // maybe for later use
    // const boldString = (str, strToFind) => str.replaceAll(strToFind, `<b>${strToFind}</b>`);
    const shortenString = (str, length) => {
        if (str.length < length) return str;

        return `${str.substring(0, length)}...`;
    };

    const { id } = song;
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    return (
        <CardContainer>
            <Link to={`song/${id}`}>
                <CardTitile>{title}</CardTitile>
            </Link>
            <FavIcon active={fav} />

            <CategoryBadge category={category} />
            <LyricsParagraph>{shortenString(lyrics['lyrics-1-a'], 50)}</LyricsParagraph>
            <LyricsParagraph>
                {lyrics['lyrics-1-b'] && shortenString(lyrics['lyrics-1-b'], 50)}
            </LyricsParagraph>
            <CustomButton>
                <Link to={`song/${id}`}>View Song</Link>
            </CustomButton>
        </CardContainer>
    );
};

export default SongCardPreview;
