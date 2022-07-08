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
                <GoogleLogInButton type="button" onClick={signInWithGoogle}>
                    <img src={GoogleBtn} />
                </GoogleLogInButton>
            </LoginButtonsContainer>
        </form>
    );
};

export default SignInForm;
