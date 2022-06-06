import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { SearchBar } from './SearchForm.styles';

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
        <form>
            <SearchBar placeholder="Search" {...register('search')} required onChange={onChange} />
        </form>
    );
};

export default SearchForm;
