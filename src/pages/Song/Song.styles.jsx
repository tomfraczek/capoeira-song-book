import styled from 'styled-components';
import { CategoryBadgeContainer } from '../../components/CategoryBadge/CategoryBadge.styles';

export const SongContainer = styled.div`
    padding: 15px;
    background-color: #fff;
`;

export const SongContentContainer = styled.div`
    display: flex;
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

export const CtaContainer = styled.div``;

export const LyricsContainer = styled.div``;
