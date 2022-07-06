import styled from 'styled-components';

export const BaseButton = styled.button`
    padding: 11px 45px;
    color: #fff;
    background-color: #416a59;
    text-transform: uppercase;
    border: 0;
    font-size: 16px;
    width: 100%;
    margin-top: auto;

    a {
        color: #fff;
    }

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

export const TransparentButton = styled(BaseButton)`
    background-color: transparent;
    color: #000;

    &:hover {
        color: #416a59;
        // border: 1px solid #416a59;
        background-color: transparent;
    }
`;

export const ButtonContainer = styled.div``;
