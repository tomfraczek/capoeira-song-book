import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import CustomInput from '../CustomInput/CustomInput';
import CustomButton, { BUTTON_TYPE_CLASSES } from '../CustomButton/CustomButton';
import AuthProviderButton from '../AuthProviderButton/AuthProviderButton';

import { Divider, Stack, FormLabel, Container } from '@mui/material';

const SignInForm = () => {
    let navigate = useNavigate();
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async data => {
        console.log(data);

        try {
            const { user } = await signInUserWithEmailAndPassword(data.email, data.password);
            navigate('/dashboard');
            reset();
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

    return (
        <Container maxWidth="xs" disableGutters>
            <h1 style={{ textAlign: 'center' }}>Log In to Songbook</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <Stack spacing={2}>
                    <FormLabel sx={{ color: 'black' }}>Email</FormLabel>
                    <CustomInput
                        minLength={6}
                        name="email"
                        control={control}
                        label="Email Address"
                        required
                    />

                    <FormLabel sx={{ color: 'black' }}>Password </FormLabel>
                    <CustomInput minLength={6} name="password" control={control} label="Password" required description='password'/>

                    <CustomButton
                        style={{ marginTop: '2rem' }}
                        buttonType={BUTTON_TYPE_CLASSES.base}
                        children="Log in"
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

export default SignInForm;
