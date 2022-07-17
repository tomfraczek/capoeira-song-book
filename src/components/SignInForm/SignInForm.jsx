import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithGooglePopup,
    signInWithFacebookPopup,
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../FormInput/FormInput';
import CustomButton, { BUTTON_TYPE_CLASSES } from '../CustomButton/CustomButton';

import GoogleBtn from './assets/google_default.png';
import FbBtn from './assets/fb_default.png'

import { GoogleFbLogInButton, LoginButtonsContainer } from './SignInForm.styles';
import { height } from '@mui/system';

const defaultFieldValues = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFieldValues);
    const { email, password } = formFields;
    let navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFieldValues);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const { user } = await signInUserWithEmailAndPassword(email, password);
            resetFormFields();
            navigate('/dashboard');
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incoret password for email');
                    break;
                case 'auth/user-not-found':
                    alert('incoret password for email');
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const signInWithFacebook = async () => {
        console.log("signed in fb")
        try {
            await signInWithFacebookPopup();
            resetFormFields();
            navigate('/dashboard');
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                placeholder="Email"
                autoComplete="false"
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={email}
            />
            <FormInput
                placeholder="Password"
                autoComplete="false"
                type="password"
                required
                onChange={handleChange}
                name="password"
                value={password}
            />

            <LoginButtonsContainer>
                <CustomButton buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
                    Log In
                </CustomButton>
                <GoogleFbLogInButton type="button" onClick={signInWithGoogle}>
                    <img src={GoogleBtn} />
                </GoogleFbLogInButton>
                <GoogleFbLogInButton type="button" onClick={signInWithFacebook}>
                    <img style={{maxHeight: "3rem"}} src={FbBtn} />
                </GoogleFbLogInButton>
            </LoginButtonsContainer>
        </form>
    );
};

export default SignInForm;
