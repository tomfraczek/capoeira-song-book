import styled from 'styled-components';

const colors = {
    colorPrimary: '#416a59',
    colorSecondary: '#73a24e',
    colorLight: '#a9c25d'
}

export const BaseButton = styled.button`
    padding: 11px 45px;
    color: #fff;
    text-transform: capitalize;
    background-color: ${colors.colorPrimary};
    border: 0;
    font-size: 1rem;
    margin-top: auto;
    border-radius: 6px;
    font-family: inherit;
    a {
        color: #fff;
    }

    &:hover {
        cursor: pointer;
        color: #fff;
        background-color: ${colors.colorSecondary};
    }
`;

export const LightButton = styled(BaseButton)`
    background-color: ${colors.colorLight};

    &:hover {
        color: #fff;
        background-color: ${colors.colorSecondary};
    }
`;

export const TransparentButton = styled(BaseButton)`
    background-color: transparent;
    color: #000;

    &:hover {
        color: ${colors.colorPrimary};
        background-color: transparent;
    }
`;

export const OutlinedButton = styled(BaseButton)`
    background-color: transparent;
    color: ${colors.colorPrimary};
    border: 1px solid ${colors.colorPrimary};
    border-radius: 6px;
    padding: 9px 24px;
    &:hover {
        color: white;
        background-color: ${colors.colorPrimary};
    }
`;