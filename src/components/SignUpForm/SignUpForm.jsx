import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    updateUserProfile,
} from '../../utils/firebase/firebase.utils';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton, { BUTTON_TYPE_CLASSES } from '../CustomButton/CustomButton';
import { FormContainer, ButtonsContainer } from '../SignInForm/SignInForm.styles';
import AuthProviderButton from '../AuthProviderButton/AuthProviderButton';
import { Divider } from '@mui/material';

const SignUpForm = () => {
    let navigate = useNavigate();

    const { handleSubmit, reset, control } = useForm({
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
            alert('password do not match');
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
        <FormContainer>
            <h1>Your Best Work Starts Here</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <label>How should we call you?</label>
                <CustomInput minLength={2} name="displayName" control={control} label="Name" />
                <label>Email</label>
                <CustomInput minLength={6} name="email" control={control} label="Email Address" />
                <label>Password</label>
                <CustomInput minLength={6} name="password1" control={control} label="Create Password" />
                <CustomInput minLength={6} name="password2" control={control} label="Confirm Password" />

                <ButtonsContainer>
                    <CustomButton
                        style={{ width: '100%' }}
                        buttonType={BUTTON_TYPE_CLASSES.base}
                        children="Sign up"
                        type="submit"
                    />
                    <Divider variant="fullWidth" sx={{ margin: '1.5rem 0' }} />
                    <AuthProviderButton btnType="google" />
                    <AuthProviderButton btnType="facebook" />
                </ButtonsContainer>
            </form>
        </FormContainer>
    );
};

export default SignUpForm;