import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import CustomInput from '../CustomInput/CustomInput';
import CustomButton, { BUTTON_TYPE_CLASSES } from '../CustomButton/CustomButton';
import AuthProviderButton from '../AuthProviderButton/AuthProviderButton';

import { Divider, FormLabel, Stack, Container } from '@mui/material';

const SignUpForm = () => {
    let navigate = useNavigate();

    const { handleSubmit, reset, control, setValue } = useForm({
        defaultValues: {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async data => {
        console.log(data);

        if (data.password1 !== data.password2) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(data.email, data.password1);
            const displayName = data.displayName;

            await createUserDocumentFromAuth(user, { displayName });

            navigate('/profile/edit-profile');
            reset();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create a user, email already in use');
            }
            console.log('user creation encontered an error', error.message);
        }
    };

    return (
        <Container maxWidth="xs" disableGutters>
            <h1 style={{ textAlign: 'center' }}>Your Best Work Starts Here</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <Stack spacing={2}>
                    <FormLabel sx={{ color: 'black' }}>How should we call you?</FormLabel>
                    <CustomInput minLength={2} name="displayName" control={control} label="Name" required />
                    <FormLabel sx={{ color: 'black' }}>Email</FormLabel>
                    <CustomInput
                        minLength={6}
                        name="email"
                        control={control}
                        label="Email Address"
                        required
                    />
                    <FormLabel sx={{ color: 'black' }}>Password</FormLabel>
                    <CustomInput
                        minLength={6}
                        name="password1"
                        control={control}
                        label="Create Password"
                        description="password"
                        required
                    />
                    <CustomInput
                        minLength={6}
                        name="password2"
                        control={control}
                        label="Confirm Password"
                        description="password"
                        required
                    />
                     <CustomInput
                        name="checkbox"
                        control={control}
                        label="I have read and agree to the Terms of Service"
                        description="checkbox"
                        required
                    />

                    <CustomButton
                        style={{ marginTop: '2rem' }}
                        buttonType={BUTTON_TYPE_CLASSES.base}
                        children="Sign up"
                        type="submit"
                    />

                </Stack>

                <Divider variant="fullWidth" sx={{ margin: '2rem 0' }} />
                <Stack spacing={2}>
                    <AuthProviderButton btnType="google" />
                    <AuthProviderButton btnType="facebook" />
                </Stack>
            </form>
        </Container>
    );
};

export default SignUpForm;
