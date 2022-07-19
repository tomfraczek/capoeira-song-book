import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

// const FormInput = ({ label, value, id, ...props }) => {
//     return (
//         <Box
//             sx={{
//                 '& > :not(style)': { m: 1 },
//             }}
//         >
//             <FormControl
//                 sx={{
//                     width: '500px',
//                 }}
//                 variant="standard"

//             >
//                 <InputLabel htmlFor={id}>{label}</InputLabel>
//                 <Input id={id} value={value} {...props} />
//             </FormControl>
//         </Box>
//     );
// };

// export default FormInput;


const FormInput = ({ id, label, register, required, minLength, ...props }) => {
    return (
        // <Box
        //     sx={{
        //         '& > :not(style)': { m: 1, margin: 0 },
        //     }}
        // >
            <FormControl
                sx={{
                    width: '100%',
                }}
                variant="outlined"
            >
                <InputLabel sx={{textTransform: 'capitalize'}} htmlFor={id}>{label}</InputLabel>
                <Input
                
        
                    id={id}
                    {...register(label, {
                        required,
                        minLength: {
                            value: minLength,
                            message: `${label} must be at least ${minLength} characters long`,
                        },
                    })}
                    {...props}
                />
            </FormControl>
        // </Box>
    );
};

export default FormInput;

// import { OutlinedInput } from '@mui/material';
// import { StyledInput } from './FormInput.styles';

// const FormInput = ({ ...props }) => {
//     return (
//         <div className="group">
//             <StyledInput {...props} />
//         </div>
//     );
// };

// export default FormInput;
