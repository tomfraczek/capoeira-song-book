import styled from 'styled-components';

export const NavigationContainer = styled.div`
    background-color: #fff;
    padding: 2rem 0;
    margin-bottom: 25px;
    @media screen and (min-width: 800px) {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

export const NavigationLinks = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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
