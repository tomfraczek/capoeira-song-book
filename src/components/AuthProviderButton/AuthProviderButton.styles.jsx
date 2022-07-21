import styled from 'styled-components';

export const AuthProviderBtn = styled.button`
    background-color:  ${props => (props.btnType === 'google' ? '#DB4437' : '#4267B2')};
    font-family: inherit;
    font-size: 1rem;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
        opacity: 95%;
    }
`;