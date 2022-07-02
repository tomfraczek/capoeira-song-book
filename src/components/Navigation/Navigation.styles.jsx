import styled from 'styled-components';

export const NavigationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 0 15px;
    margin-top: 15px;
`;

export const LogoContainer = styled.div`
    h1 {
        color: #416a59;
    }
`;

export const NavigationLinks = styled.div`
    display: flex;
    align-items: center;

    a {
        margin: 0 10px;
        color: #73a24e;
    }
`;

export const LogoutButton = styled.span`
    color: #73a24e;

    &:hover {
        cursor: pointer;
    }
`;
