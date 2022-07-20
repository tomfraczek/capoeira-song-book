import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    signInUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import CustomInput from '../CustomInput/CustomInput';
import CustomButton, { BUTTON_TYPE_CLASSES } from '../CustomButton/CustomButton';

import {
    FormContainer,
    ButtonsContainer,
} from './SignInForm.styles';
import AuthProviderButton from '../AuthProviderButton/AuthProviderButton';
import { Divider } from '@mui/material';



const SignInForm = () => {
    let navigate = useNavigate();
    const {
        handleSubmit,
        reset,
        control
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async data => {
        console.log(data);

        try {
            const {user} = await signInUserWithEmailAndPassword(data.email, data.password);
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
        <FormContainer>
            <h1>Log In to Songbook</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <label>Email</label>
                <CustomInput
                    minLength={6}
                    name="email" control={control} label="Email Address"
                />
                <label>Password</label>
                <CustomInput
                    minLength={6}
                    name="password" control={control} label="Password"
                />

                <ButtonsContainer>
                    <CustomButton
                        style={{ width: '100%' }}
                        buttonType={BUTTON_TYPE_CLASSES.base}
                        children="Log in"
                        type="submit"
                    />
                    <Divider variant='fullWidth' sx={{margin: '1.5rem 0'}}/>
                    <AuthProviderButton btnType="google" />
                    <AuthProviderButton btnType="facebook" />
                </ButtonsContainer>
            </form>
        </FormContainer>
    );
};

export default SignInForm;