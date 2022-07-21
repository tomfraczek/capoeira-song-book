import * as React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Checkbox, FormControlLabel } from '@mui/material';

const CustomInput = ({ name, control, label, minLength, required, description, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <>
            {description !== 'checkbox' && (
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
                            value={value ?? ''}
                            fullWidth
                            label={label}
                            variant="outlined"
                            required={required}
                            type={description === 'password' && !showPassword ? 'password' : 'text'}
                            {...(description === 'password'
                                ? {
                                      InputProps: {
                                          endAdornment: (
                                              <InputAdornment position="end">
                                                  <IconButton
                                                      aria-label="toggle password visibility"
                                                      onClick={() => setShowPassword(!showPassword)}
                                                      onMouseDown={handleMouseDownPassword}
                                                      edge="end"
                                                  >
                                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                                  </IconButton>
                                              </InputAdornment>
                                          ),
                                      },
                                  }
                                : null)}
                            {...props}
                        />
                    )}
                />
            )}
            {description === 'checkbox' && (
                <Controller
                    name={name}
                    control={control}
                    rules={{
                        required: true,
                        message: 'Must be checked',
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                sx={{color: 'lightgrey'}}
                                    error={error}
                                    onChange={onChange}
                                    value={value}
                                    label={label}
                                    variant="outlined"
                                    disableRipple
                                />
                            }
                            label={label}
                        />
                    )}
                />
            )}
        </>
    );
};

export default CustomInput;
