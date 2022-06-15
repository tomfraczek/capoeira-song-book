import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

import CategoryBadge from '../CategoryBadge/CategoryBadge';

import { CardTitile, CardContainer, LyricsParagraph } from './SongCardPreview.styles';

const SongCardPreview = ({ song }) => {
    const { category, createdAt, lyrics, title } = song;

    // maybe for later use
    // const boldString = (str, strToFind) => str.replaceAll(strToFind, `<b>${strToFind}</b>`);
    // const substring = (str, length) => str.substring(0, length);

    const { id } = song;
    return (
        <CardContainer>
            <Link to={`song/${id}`}>
                <CardTitile>{title}</CardTitile>
            </Link>

            <CategoryBadge>{category}</CategoryBadge>
            <LyricsParagraph>{lyrics['lyrics-1-a']}</LyricsParagraph>
            <LyricsParagraph>{lyrics['lyrics-1-b']}</LyricsParagraph>
            <Link to={`song/${id}`}>View Song</Link>
        </CardContainer>
    );
};

export default SongCardPreview;
