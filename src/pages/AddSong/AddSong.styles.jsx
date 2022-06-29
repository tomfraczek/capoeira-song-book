import styled from 'styled-components';

export const Title = styled.input`
    height: 56px;
    border-width: 1px;
    border-color: #c4c4c4;
    border-radius: 4px;
    padding: 16.5px 32px 16.5px 14px;
    margin-bottom: 10px;
    width: 100%;
`;

export const Textarea = styled.textarea`
    resize: none;
    height: 150px;
    border-width: 1px;
    border-color: #c4c4c4;
    border-radius: 4px;
    padding: 16.5px 32px 16.5px 14px;
    margin-bottom: 10px;
`;

export const RadioContainer = styled.div`
    flex-direction: row !important;
`;

export const AddSongContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: flex-start;
    margin-top: 30px;
`;

export const Header = styled.span`
    font-size: 21px;
    width: 100%;
`;

export const AddSongForm = styled.form`
    display: flex;
    flex-direction: column;
    width: calc(50% - 10px);
`;

export const LyricsContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #c4c4c4;
    padding: 20px;
    margin-bottom: 15px;
    position: relative;
`;

export const PreviewContainer = styled.div`
    width: calc(50% - 10px);
    position: sticky;
    top: 20px;
    margin-left: 20px;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #c4c4c4;

    p:nth-child(odd) {
        font-weight: bold;
    }
`;

export const PreviewTitle = styled.h1`
    margin-top: 0;
`;

export const TitleContainer = styled.div`
    padding: 20px;
    border: 1px solid #c4c4c4;
    margin-bottom: 15px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const CheckboxContainer = styled.div`
    display: flex;
    margin-bottom: 15px;

    label {
        margin-right: 7px;
    }
`;

export const RemoveButton = styled.span`
    position: absolute;
    width: 24px;
    height: 24px;
    right: -14px;
    top: calc(50% - 12px);

    &:hover {
        cursor: pointer;
    }

    img {
        width: 100%;
    }
`;

export const ExampleContainer = styled.div`
    font-size: 14px;
    color: #747474;

    span {
        font-weight: bold;
        font-style: italic;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;

    svg {
        color: #a9c25d;
        height: 40px;
        width: 40px;
        position: relative;
        top: -15px;

        &:hover {
            cursor: pointer;
            color: #73a24e;
        }
    }
`;
