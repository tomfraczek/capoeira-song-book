import styled from 'styled-components';
import { CategoryBadgeContainer } from '../../components/CategoryBadge/CategoryBadge.styles';

export const SongContainer = styled.div`
    padding: 15px;
    background-color: #fff;
    width: 100%;
`;

export const SongContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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

export const SongHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
