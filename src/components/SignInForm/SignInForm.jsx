import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    signInUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../FormInput/FormInput';
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
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
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
                <FormInput
                    id="log-in-email"
                    label="email"
                    // placeholder="Email Address"
                    register={register} 
                    required
                    minLength={6}
                />
                <p>{errors.email?.message}</p>
                <FormInput
                    id="log-in-password"
                    register={register}
                    label="password"
                    // placeholder="Your password"
                    required
                    minLength={6}
                />
                <p>{errors.password?.message}</p>

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

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import {
//     signInWithGooglePopup,
//     signInWithFacebookPopup,
//     createUserDocumentFromAuth,
//     signInUserWithEmailAndPassword,
// } from '../../utils/firebase/firebase.utils';

// import FormInput from '../FormInput/FormInput';
// import CustomButton, { BUTTON_TYPE_CLASSES } from '../CustomButton/CustomButton';

// import GoogleBtn from './assets/google_default.png';
// import FbBtn from './assets/fb_default.png'

// import { GoogleFbLogInButton, LoginButtonsContainer, GoogleLogInButton } from './SignInForm.styles';
// import { height } from '@mui/system';
// import { Container } from '@mui/material';

// const defaultFieldValues = {
//     email: '',
//     password: '',
// };

// const SignInForm = () => {
//     const [formFields, setFormFields] = useState(defaultFieldValues);
//     const { email, password } = formFields;
//     let navigate = useNavigate();

//     const resetFormFields = () => {
//         setFormFields(defaultFieldValues);
//     };

//     const handleSubmit = async event => {
//         event.preventDefault();
//         if (!email) alert('write down email');
//         if (!password) alert('write down password');

//         try {
//             const { user } = await signInUserWithEmailAndPassword(email, password);
//             resetFormFields();
//             navigate('/dashboard');
//         } catch (error) {
//             switch (error.code) {
//                 case 'auth/invalid-email':
//                     alert('incorrect email');
//                     break;
//                 case 'auth/user-not-found':
//                     alert('user not found');
//                     break;
//                 case 'auth/wrong-password':
//                     alert('wrong password');
//                     break;
//                 default:
//                     console.log(error);
//                     break;
//             }
//         }
//     };

//     const handleChange = event => {
//         const { name, value } = event.target;

//         setFormFields({ ...formFields, [name]: value });
//     };

//     const signInWithGoogle = async () => {
//         try {
//             await signInWithGooglePopup();
//             resetFormFields();
//             navigate('/dashboard');
//         } catch (error) {
//             alert(error.message)
//         }
//     };

//     const signInWithFacebook = async () => {
//         console.log("signed in fb")
//         try {
//             await signInWithFacebookPopup();
//             resetFormFields();
//             navigate('/dashboard');
//         } catch (error) {
//             alert(error.message)
//         }
//     }

//     return (
//         <Container>
//         <h1>Log In to Songbook</h1>
//         <form onSubmit={handleSubmit} noValidate autoComplete="off">
//             <FormInput
//                 id="log-in-email"
//                 label="Email"
//                 autoComplete="off"
//                 type="email"
//                 required
//                 onChange={handleChange}
//                 name="email"
//                 value={email}
//             />
//             <FormInput
//                 id="log-in-password"
//                 label="Password"
//                 autoComplete="off"
//                 type="password"
//                 required
//                 onChange={handleChange}
//                 name="password"
//                 value={password}
//             />

//             <LoginButtonsContainer>
//                 <CustomButton buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
//                     Log In
//                 </CustomButton>
//                 <GoogleFbLogInButton type="button" onClick={signInWithGoogle}>
//                     <img src={GoogleBtn} />
//                 </GoogleFbLogInButton>
//                 <GoogleFbLogInButton type="button" onClick={signInWithFacebook}>
//                     <img style={{maxHeight: "3rem"}} src={FbBtn} />
//                 </GoogleFbLogInButton>
//             </LoginButtonsContainer>
//         </form>
//         </Container>
//     );
// };

// export default SignInForm;
