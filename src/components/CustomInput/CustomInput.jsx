import * as React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const CustomInput = ({ name, control, label, minLength, ...props }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: true,
                    minLength: {
                        value: minLength,
                        message: `${label} must be at least ${minLength} characters long`,
                    },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        helperText={error ? error.message : null}
                        size="small"
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        label={label}
                        variant="outlined"
                        {...props}
                    />
                )}
            />
        </>
    );
};

export default CustomInput;

// const CustomInput = ({ id, label, register, required, minLength, ...props }) => {
//     return (
//             <FormControl
//                 sx={{
//                     width: '100%',
//                 }}
//                 variant="outlined"
//             >
//                 <InputLabel sx={{textTransform: 'capitalize'}} htmlFor={id}>{label}</InputLabel>
//                 <Input

//                     id={id}
//                     {...register(label, {
//                         required,
//                         minLength: {
//                             value: minLength,
//                             message: `${label} must be at least ${minLength} characters long`,
//                         },
//                     })}
//                     {...props}
//                 />
//             </FormControl>
//     );
// };

// export default CustomInput;
