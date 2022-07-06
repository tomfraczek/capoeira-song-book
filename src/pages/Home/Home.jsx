import { useState } from 'react';

import CustomModal from '../../components/CustomModal';
import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';
import CustomButton, { BUTTON_TYPE_CLASSES } from '../../components/CustomButton/CustomButton';

import { HomeContainer, CtaContainer, IntroductionContainer } from './Home.styles';

const Home = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log('dupa');

    return <HomeContainer>asdasd</HomeContainer>;
};

export default Home;
