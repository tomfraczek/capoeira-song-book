import { OutlinedInput } from '@mui/material';
import { StyledInput } from './FormInput.styles';

const FormInput = ({ ...props }) => {
    return (
        <div className="group">
            <StyledInput {...props} />
        </div>
    );
};

export default FormInput;
