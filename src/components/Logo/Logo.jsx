import { useNavigate } from 'react-router-dom';
import LogoPng from './assets/logo-trans.png';
import { LogoContainer } from './Logo.styles';

const Logo = () => {
    const navigate = useNavigate();
    return (
        <>
            <LogoContainer onClick={() => navigate('/')}>
                <img src={LogoPng} />
                <h1>Capoeira Workshop</h1>
            </LogoContainer>
        </>
    );
};

export default Logo;
