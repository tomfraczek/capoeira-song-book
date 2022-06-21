import styled from 'styled-components';

export const BaseButton = styled.button`
    padding: 11px 45px;
    color: #fff;
    background-color: #416a59;
    text-transform: uppercase;
    border: 0;
    font-size: 16px;

    &:hover {
        cursor: pointer;
        color: #fff;
        // border: 1px solid #a9c25d;
        background-color: #73a24e;
    }
`;

export const LightButton = styled(BaseButton)`
    background-color: #a9c25d;

    &:hover {
        color: #fff;
        // border: 1px solid #a9c25d;
        background-color: #73a24e;
    }
`;

export const ButtonContainer = styled.div``;
