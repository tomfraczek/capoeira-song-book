import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    updateUserProfile,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../FormInput/FormInput';
import CustomButton, { BUTTON_TYPE_CLASSES } from '../CustomButton/CustomButton';
import { FormContainer, ButtonsContainer } from '../SignInForm/SignInForm.styles';
import AuthProviderButton from '../AuthProviderButton/AuthProviderButton';
import { Divider } from '@mui/material';

const SignUpForm = () => {
    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async data => {
        console.log(data);

        if (data.password !== data.confirmPassword) {
            alert('password do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(data.email, data.password);
            const displayName = data.displayName;

            await createUserDocumentFromAuth(user, { displayName });

            navigate('/profile/edit-profile');
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
                <FormInput
                    id="username"
                    label="displayName"
                    // placeholder="Username"
                    register={register}
                    required
                    minLength={1}
                />
                <p>{errors.username?.message}</p>
                <FormInput
                    id="sign-in-email"
                    label="email"
                    // placeholder="Email Address"
                    register={register}
                    required
                    minLength={6}
                />
                <p>{errors.email?.message}</p>
                <FormInput
                    id="sign-in-password"
                    register={register}
                    label="password"
                    // placeholder="Your password"
                    required
                    minLength={6}
                />
                <p>{errors.password?.message}</p>
                <FormInput
                    id="confirm-password"
                    register={register}
                    label="confirmPassword"
                    // placeholder="Your password"
                    required
                    minLength={6}
                />
                <p>{errors.confirmPassword?.message}</p>

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
