import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { FormContainer } from './SearchForm.styles';

const SearchForm = ({ handleSearchInput, handleTypes, checkboxesValues }) => {
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
            <TextField
                label="Search by title or lirycs"
                variant="outlined"
                {...register('search')}
                onChange={handleSearchInput}
                style={{ width: '100%' }}
            />
            <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="corrido"
                        control={
                            <Checkbox
                                checked={checkboxesValues.corrido}
                                style={{ color: '#416a59' }}
                                onChange={e => handleTypes(e)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                defaultChecked
                            />
                        }
                        label="Corridos"
                        labelPlacement="start"
                        style={{ marginLeft: '0' }}
                    />
                    <FormControlLabel
                        value="ladainha"
                        control={
                            <Checkbox
                                checked={checkboxesValues.ladainha}
                                style={{ color: '#416a59' }}
                                onChange={e => handleTypes(e)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                defaultChecked
                            />
                        }
                        label="Ladainhas"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="maculele"
                        control={
                            <Checkbox
                                checked={checkboxesValues.maculele}
                                style={{ color: '#416a59' }}
                                onChange={e => handleTypes(e)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                defaultChecked
                            />
                        }
                        label="Maculele"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="quadra"
                        control={
                            <Checkbox
                                checked={checkboxesValues.quadra}
                                style={{ color: '#416a59' }}
                                onChange={e => handleTypes(e)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                defaultChecked
                            />
                        }
                        label="Quadras"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="samba"
                        control={
                            <Checkbox
                                checked={checkboxesValues.samba}
                                style={{ color: '#416a59' }}
                                onChange={e => handleTypes(e)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                defaultChecked
                            />
                        }
                        label="Samba de Roda"
                        labelPlacement="start"
                    />
                </FormGroup>
            </FormControl>
        </FormContainer>
    );
};

export default SearchForm;
