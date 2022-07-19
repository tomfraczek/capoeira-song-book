import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector';

import CustomButton, { BUTTON_TYPE_CLASSES } from '../CustomButton/CustomButton';
import AccountMenu from '../AccountMenu';

import { NavigationContainer, NavigationLinks } from './Navigation.styles';

import Logo from '../Logo';
import { Typography } from '@mui/material';

const Navigation = ({ NavType }) => {
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    return (
        <>
            <NavigationContainer>
                <Logo />
                <NavigationLinks>
                    {NavType === 'Home' && (
                        <>
                            <span>Home Nav Links Here</span>
                        </>
                    )}
                    {NavType === 'SignInForm' && (
                        <>
                            <span style={{marginRight: "1rem"}}>New to Songbook?</span>
                            <CustomButton
                                buttonType={BUTTON_TYPE_CLASSES.outlined}
                                onClick={() => navigate('../sign-up', { replace: true })}
                            >
                                Create an account
                            </CustomButton>
                        </>
                    )}
                    {NavType === 'SignUpForm' && (
                        <>
                            <span style={{marginRight: "1rem"}}>Already have an Account?</span>
                            <CustomButton
                                buttonType={BUTTON_TYPE_CLASSES.outlined}
                                onClick={() => navigate('../sign-in', { replace: true })}
                            >
                                Sign In
                            </CustomButton>
                        </>
                    )}
                </NavigationLinks>
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;
