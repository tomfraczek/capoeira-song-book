import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector';

import AccountMenu from '../AccountMenu';

import { NavigationContainer, NavigationLinks, LogoContainer } from './Navigation.styles';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <>
            <NavigationContainer>
                <LogoContainer>
                    <h1>Capoeira Songbook</h1>
                </LogoContainer>
                <NavigationLinks>
                    <Link to="/">Home</Link>
                    <Link to="/songbook">Songbook</Link>

                    {currentUser ? <AccountMenu user={currentUser} /> : <Link to="/auth">Sign Up</Link>}
                </NavigationLinks>
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;
