import styled from 'styled-components';

export const PreviewContainer = styled.div`
    width: calc(50% - 10px);
    position: sticky;
    top: 20px;
    margin-left: 20px;
    align-items: flex-start;
    padding-right: 20px;
`;

export const PreviewTitle = styled.h1`
    margin-top: 0;
`;

export const PreviewParagraph = styled.p`
    white-space: pre-line;
    display: flex;

    span:first-child {
        margin-right: 5px;
    }
`;

export const PreviewParagraphContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PreviewParagraphBold = styled.p`
    font-weight: bold;
    white-space: pre-line;
    margin-left: 18px;
`;

export const PreviewContent = styled.div`
    padding: 10px;
    border: 1px solid #c4c4c4;
    background-color: #fff;
`;

export const Title = styled.h1`
    margin-top: 5px;
`;
