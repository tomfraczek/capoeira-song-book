import { BaseButton, LightButton } from './CustomButton.styles';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    light: 'light',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.light]: LightButton,
    }[buttonType]);

const CustomButton = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default CustomButton;
