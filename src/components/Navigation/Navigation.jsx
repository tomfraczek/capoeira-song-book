import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector';

import CustomButton, { BUTTON_TYPE_CLASSES } from '../CustomButton/CustomButton';
import AccountMenu from '../AccountMenu';

import { NavigationContainer, NavigationLinks } from './Navigation.styles';

import Logo from '../Logo';
import { Typography } from '@mui/material';

const Navigation = ({ navType }) => {
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    return (
        <>
            <NavigationContainer>
                <Logo />
                <NavigationLinks>
                    {navType === 'home' && (
                        <>
                            <span>Home Nav Links Here</span>
                        </>
                    )}
                    {navType === 'profile' && <>{/* <span>User Nav Links Here</span> */}</>}
                    {navType === 'signInForm' && (
                        <>
                            <span style={{ marginRight: '1rem' }}>New to Songbook?</span>
                            <CustomButton
                                buttonType={BUTTON_TYPE_CLASSES.outlined}
                                children="Create an account"
                                onClick={() => navigate('../sign-up', { replace: true })}
                            />
                        </>
                    )}
                    {navType === 'signUpForm' && (
                        <>
                            <span style={{ marginRight: '1rem' }}>Already have an Account?</span>
                            <CustomButton
                                buttonType={BUTTON_TYPE_CLASSES.outlined}
                                children="Sign in"
                                onClick={() => navigate('../sign-in', { replace: true })}
                            />
                        </>
                    )}
                </NavigationLinks>
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;
