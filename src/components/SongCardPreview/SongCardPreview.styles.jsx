import styled from 'styled-components';

export const CardContainer = styled.div`
    position: relative;
    width: 300px;
    margin-bottom: 20px;
    padding: 10px;
    margin: 10px;
    border: 1px solid #c4c4c4;

    &:nth-child(4n + 1) {
        margin-left: 0;
    }

    &:nth-child(4n) {
        margin-right: 0;
    }

    svg {
        position: absolute;
        top: 0;
        right: 0;

        &:hover: {
            cursor: pointer;
        }
    }
`;

export const CardTitile = styled.p`
    font-size: 22px;
    margin-top: 0;
    color: #416a59;
`;

export const LyricsParagraph = styled.p`
    white-space: break-spaces;
    word-break: break-all;
    color: #416a59;
`;
