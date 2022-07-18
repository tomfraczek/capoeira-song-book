import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../FormInput/FormInput';
import CustomButton, { BUTTON_TYPE_CLASSES } from '../CustomButton/CustomButton';

import GoogleBtn from './assets/google_default.png';

import { GoogleLogInButton, LoginButtonsContainer } from './SignInForm.styles';
import { Container } from '@mui/material';

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
        if (!email) alert('write down email');
        if (!password) alert('write down password');

        try {
            const { user } = await signInUserWithEmailAndPassword(email, password);
            resetFormFields();
            navigate('/dashboard');
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    alert('incorrect email');
                    break;
                case 'auth/user-not-found':
                    alert('user not found');
                    break;
                case 'auth/wrong-password':
                    alert('wrong password');
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

    return (
        <Container>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <FormInput
                id="log-in-email"
                label="Email"
                autoComplete="off"
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={email}
            />
            <FormInput
                id="log-in-password"
                label="Password"
                autoComplete="off"
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
                <GoogleLogInButton type="button" onClick={signInWithGoogle}>
                    <img src={GoogleBtn} />
                </GoogleLogInButton>
            </LoginButtonsContainer>
        </form>
        </Container>
    );
};

export default SignInForm;
