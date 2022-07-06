import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { FormContainer } from './SearchForm.styles';

const SearchForm = ({ onChange }) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            search: '',
        },
    });

    return (
        <FormContainer>
            <TextField label="Search" variant="outlined" {...register('search')} onChange={onChange} />
        </FormContainer>
    );
};

export default SearchForm;
