import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import { RemoveButtonContainer } from './ButtonRounded.styles';

const ButtonRounded = ({ type, ...props }) => {
    return (
        <RemoveButtonContainer type={type}>
            <IconButton color="success" {...props}>
                {type === 'alert' ? <DeleteIcon /> : <AddIcon />}
            </IconButton>
        </RemoveButtonContainer>
    );
};

export default ButtonRounded;
