import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CustomSelectInput = () => {
    const [age, setAge] = useState('');

    const handleChange = event => {
        setAge(event.target.value);
    };

    return (
        <div>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={age}
                    label="Type *"
                    onChange={handleChange}
                    style={{ background: 'white' }}
                >
                    <MenuItem value="corridos">Corrido</MenuItem>
                    <MenuItem value="ladainha">Ladainha</MenuItem>
                    <MenuItem value="maculele">Maculele</MenuItem>
                    <MenuItem value="quadras">Quadra</MenuItem>
                    <MenuItem value="samba">Samba de Roda</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>
        </div>
    );
};

export default CustomSelectInput;
