import styled from 'styled-components';

export const RemoveButtonContainer = styled.span`
    button {
        color: ${props => (props.type === 'alert' ? '#e91e63' : '#7d7d7d')};
    }
`;
