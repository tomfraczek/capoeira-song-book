import styled from 'styled-components';

export const PreviewContainer = styled.div`
    width: calc(50% - 10px);
    position: sticky;
    top: 20px;
    margin-left: 20px;
    align-items: flex-start;
`;

export const PreviewTitle = styled.h1`
    margin-top: 0;
`;

export const PreviewParagraph = styled.p`
    white-space: pre-line;
`;

export const PreviewParagraphContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PreviewParagraphBold = styled.p`
    font-weight: bold;
    white-space: pre-line;
`;

export const PreviewContent = styled.div`
    padding: 10px;
    border: 1px solid #c4c4c4;
    background-color: #fff;
`;

export const Title = styled.h1`
    margin-top: 5px;
`;
