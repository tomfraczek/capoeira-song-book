import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import AccountMenu from '../AccountMenu';

import { NavigationContainer, NavigationLinks, LogoContainer, LogoutButton } from './Navigation.styles';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <NavigationContainer>
                <LogoContainer>
                    <h1>Capoeira Songbook</h1>
                </LogoContainer>
                <NavigationLinks>
                    <Link to="/">Home</Link>
                    <Link to="/songbook">Songbook</Link>

                    {currentUser ? <AccountMenu /> : <Link to="/auth">Sign Up</Link>}
                </NavigationLinks>
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;
