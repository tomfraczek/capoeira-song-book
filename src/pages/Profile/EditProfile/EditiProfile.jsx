import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user/user.selector';
import { setCurrentUser } from '../../../store/user/user.action';

import {
    updateUserProfile,
    onAuthStateChangedListener,
    updateUser,
} from '../../../utils/firebase/firebase.utils';

import { useNavigate } from 'react-router-dom';

import FormInput from '../../../components/FormInput/FormInput';
import CustomButton, { BUTTON_TYPE_CLASSES } from '../../../components/CustomButton/CustomButton';

import { FormContainer } from './EditProfile.styles';

const defaultFieldValues = {
    displayName: '',
    email: '',
};

const EditiProfile = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [formFields, setFormFields] = useState(defaultFieldValues);
    const { displayName, email } = formFields;
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser);
            const { displayName, email } = currentUser;
            setFormFields({ displayName, email });
        }
    }, [currentUser]);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const updateProfile = async () => {
                await updateUserProfile(formFields);
                dispatch(setCurrentUser(formFields));
            };

            const updateUserDb = onAuthStateChangedListener(user => {
                updateUser(user.uid, { displayName });
            });

            updateProfile();
            updateUserDb();
        } catch (error) {
            console.log('user edit encontered an error', error.message);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <>
            <FormContainer onSubmit={handleSubmit}>
                <FormInput
                    placeholder="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                    label="Display Name"
                />
                <FormInput
                    placeholder="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                    label="Email"
                />
                <CustomButton
                    style={{ marginLeft: '8px' }}
                    buttonType={BUTTON_TYPE_CLASSES.base}
                    type="submit"
                >
                    Update
                </CustomButton>
            </FormContainer>
        </>
    );
};

export default EditiProfile;
