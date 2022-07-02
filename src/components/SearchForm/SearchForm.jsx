import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { SearchBar, FormContainer } from './SearchForm.styles';

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
            <SearchBar placeholder="Search" {...register('search')} required onChange={onChange} />
        </FormContainer>
    );
};

export default SearchForm;
