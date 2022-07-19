import styled from 'styled-components';

export const FormContainer = styled.div`
    margin: 0 auto;
    text-align: center;
    max-width: 400px;
`;

export const GoogleFbLogInButton = styled.div`
    background: none;
    border: none;
    border-radius: 6px;
    padding: 11px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`;

export const LoginButtonsContainer = styled.div`
    max-width: 400px;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const LineDecor = styled.div`
width: 100%;
height: 1px;
background-color: lightgrey;
margin: 2rem 0;
`
