import styled from 'styled-components';

export const AuthProviderBtn = styled.div`
    background-color:  ${props => (props.btnType === 'google' ? '#DB4437' : '#4267B2')};
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