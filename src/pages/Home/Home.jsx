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

    return (
        <HomeContainer>
            <IntroductionContainer>
                <h1>Songbook</h1>
                <p>Capoeira songs and lyrics</p>
            </IntroductionContainer>
            <CtaContainer>
                <SignInForm />
                <CustomButton buttonType={BUTTON_TYPE_CLASSES.light} onClick={handleOpen}>
                    Create New Account
                </CustomButton>
            </CtaContainer>

            <CustomModal onClose={handleClose} open={open}>
                <SignUpForm />
            </CustomModal>
        </HomeContainer>
    );
};

export default Home;
