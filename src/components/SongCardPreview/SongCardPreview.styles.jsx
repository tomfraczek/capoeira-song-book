import styled from 'styled-components';

export const CardContainer = styled.div`
    position: relative;
    width: 300px;
    margin-bottom: 20px;
    padding: 10px;
    margin: 10px;
    border: 1px solid #c4c4c4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:nth-child(4n + 1) {
        margin-left: 0;
    }

    &:nth-child(4n) {
        margin-right: 0;
    }

    svg {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 20px;

        &:hover {
            cursor: pointer;
        }
    }
`;

export const CardTitile = styled.p`
    font-size: 22px;
    margin-top: 0;
    margin-bottom: 5px;
    color: #416a59;
    word-break: break-word;
    white-space: break-spaces;
    max-width: 90%;
`;

export const LyricsParagraph = styled.p`
    word-break: break-word;
    white-space: break-spaces;
    word-break: break-all;
    color: #416a59;
`;
