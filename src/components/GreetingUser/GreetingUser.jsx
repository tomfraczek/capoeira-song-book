import React, { useState, useEffect } from 'react';

import { GreetingContainer } from './GreetingUser.styles';

const GreetingUser = ({ name }) => {
    const [greeting, setGreeting] = useState('');

    const today = new Date();
    const curHr = today.getHours();

    useEffect(() => {
        if (curHr < 12) {
            setGreeting('Bom Dia');
        } else if (curHr < 18) {
            setGreeting('Boa Tarde');
        } else {
            setGreeting('Boa Noite');
        }
    }, []);

    return (
        <GreetingContainer>
            {greeting} {name}
        </GreetingContainer>
    );
};

export default GreetingUser;
