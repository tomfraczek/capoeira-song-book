import styled from 'styled-components';
import { CategoryBadgeContainer } from '../../components/CategoryBadge/CategoryBadge.styles';

export const SongContentContainer = styled.div`
    display: flex;
    // align-items: flex-end;
    justify-content: space-between;
`;

export const Title = styled.h1`
    // font-size: 18px;
    margin: 0;
`;

export const SongVerse = styled.p`
    white-space: break-spaces;

    &:nth-child(2n) {
        font-weight: bold;
    }
`;

export const LyricsContainer = styled.div``;
