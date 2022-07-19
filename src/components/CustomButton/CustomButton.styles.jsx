import styled from 'styled-components';

export const BaseButton = styled.button`
    padding: 11px 45px;
    color: #fff;
    background-color: #416a59;
    text-transform: uppercase;
    border: 0;
    font-size: 1rem;
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

export const OutlinedButton = styled(BaseButton)`
    background-color: transparent;
    color: #416a59;
    text-transform: none;
    border: 1px solid #416a59;
    border-radius: 6px;

    &:hover {
        color: white;
        background-color: #416a59;
    }
`;

export const ButtonContainer = styled.div``;
