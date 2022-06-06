import styled from 'styled-components';

export const CardContainer = styled.div`
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
`;

export const CardTitile = styled.p`
    font-size: 22px;
    margin-top: 0;
    color: #416a59;
`;

export const LyricsParagraph = styled.p`
    word-break: break-all;
    color: #416a59;
`;
