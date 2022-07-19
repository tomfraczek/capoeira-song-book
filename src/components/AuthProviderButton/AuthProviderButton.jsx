import React from 'react';
import { signInWithGooglePopup, signInWithFacebookPopup } from '../../utils/firebase/firebase.utils';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { AuthProviderBtn } from './AuthProviderButton.styles';
import { useNavigate } from 'react-router-dom';

const AuthProviderButton = ({ btnType, ...props }) => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopup();
            navigate('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    };

    const signInWithFacebook = async () => {
        console.log('signed in fb');
        try {
            await signInWithFacebookPopup();
            navigate('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <>
            <AuthProviderBtn
                {...props}
                btnType={btnType}
                type="button"
                onClick={btnType === 'google' ? signInWithGoogle : signInWithFacebook}
            >
                {btnType === 'google' ? <GoogleIcon /> : <FacebookIcon />}
                <span>{btnType === 'google' ? 'Sign In with Google' : 'Sign In with Facebook'}</span>
            </AuthProviderBtn>
        </>
    );
};

export default AuthProviderButton;
