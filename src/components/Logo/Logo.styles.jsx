import styled from 'styled-components';

export const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    @media screen and (min-width: 800px) {
        flex-direction: row;
        margin-bottom: 0;  
    }

    cursor: pointer;
    img {
        height: 3rem;
        @media screen and (min-width: 800px) {
            margin-right: 1rem; 
        }     
    }
    h1 {
        color: #416a59;
        text-align: center;
        @media screen and (min-width: 800px) {
            text-align: left;
        }
    }
`;
