import styled from 'styled-components';

export const MySongsContainer = styled.div`
    width: 100%;
    background-color: #fff;
`;

export const NoSongNotification = styled.div`
    height: 100%;
    a {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #416a59;
        &:hover {
            color: #73a24e;
        }
    }

    svg {
        width: 160px;
        height: 160px;
        margin-bottom: 50px;
        color: #0000008a;
    }
`;
