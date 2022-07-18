import { Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    updateUserProfile,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../FormInput/FormInput';

const defaultFieldValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFieldValues);
    const { displayName, email, password, confirmPassword } = formFields;
    let navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFieldValues);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('password do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });

            resetFormFields();
            navigate('/profile/edit-profile');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create a user, email already in use');
            }
            console.log('user creation encontered an error', error.message);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <Container>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <button type="submit">Sign Up</button>
            </form>
        </Container>
    );
};

export default SignUpForm;
