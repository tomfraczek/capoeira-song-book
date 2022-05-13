import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Header = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <div className="header-container">
                <h1>Capoeira Songbook</h1>
                <div className="header-links">
                    {currentUser ? (
                        <span onClick={signOutUser}>Sign Out</span>
                    ) : (
                        <Link to="/auth">Sign Up</Link>
                    )}
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Header;
