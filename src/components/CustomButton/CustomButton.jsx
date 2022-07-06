import { BaseButton, LightButton, ButtonContainer, TransparentButton } from './CustomButton.styles';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    light: 'light',
    transparent: 'transparent',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.light]: LightButton,
        [BUTTON_TYPE_CLASSES.transparent]: TransparentButton,
    }[buttonType]);

const CustomButton = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <ButtonContainer>
            <CustomButton {...otherProps}>{children}</CustomButton>
        </ButtonContainer>
    );
};

export default CustomButton;
