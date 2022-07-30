import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
    FormGroup,
    Checkbox,
    FormLabel,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Tooltip,
    Stack,
    Autocomplete,
    TextField,
} from '@mui/material';

import {
    addSongToDb,
    updateUser,
    getCurrentUser,
    onAuthStateChangedListener,
} from '../../utils/firebase/firebase.utils';

import { selectCurrentUser } from '../../store/user/user.selector';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import PreviewForm from '../../components/PreviewForm/PreviewForm';
import CustomButton, { BUTTON_TYPE_CLASSES } from '../../components/CustomButton/CustomButton';
import ButtonRounded from '../../components/ButtonRounded';
import CustomTooltip from '../../components/Tooltip/CustomTooltip';

import remove from './assets/remove.png';

import {
    Title,
    Textarea,
    RadioContainer,
    AddSongContainer,
    Header,
    AddSongForm,
    LyricsContainer,
    TitleContainer,
    HeaderContainer,
    CheckboxContainer,
    ExampleContainer,
    ButtonContainer,
} from './AddSong.styles';
import InfoTooltip from '../../components/InfoTooltip/InfoTooltip';

const ButtonPosition = {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
};

const AddSong = () => {
    const [textInputs, setTextInputs] = useState(['lyrics-1']);
    const [preview, setPreview] = useState(false);
    const [userId, setUserId] = useState('');
    const [autoChorus, setAutoChorus] = useState(false);
    const currentUser = useSelector(selectCurrentUser);

    const {
        register,
        handleSubmit,
        watch,
        unregister,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            category: [],
        },
    });

    const categoryOptions = [
        { value: 'corrido', label: 'Corrido' },
        { value: 'ladainha', label: 'Ladainha' },
        { value: 'maculele', label: 'Maculele' },
        { value: 'samba', label: 'Samba de Roda' },
    ];

    useEffect(() => {
        const updateUserDb = onAuthStateChangedListener(user => {
            setUserId(user.uid);
        });

        updateUserDb();
    }, []);

    useEffect(() => {
        // console.log(currentUser);
    }, [currentUser]);

    const onSubmit = data => {
        const { title, category, youtube, ...rest } = data;
        const timestamp = Date.now(); // This would be the timestamp you want to format
        const timestampFormat = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(timestamp);

        const songToAdd = {
            category: category.map(tag => tag.value),
            title,
            createdAt: timestampFormat,
            youtube,
            autoComplete: autoChorus,
            addedBy: userId,
            rating: {
                score: 0,
                votes: 0,
            },
            lyrics: { ...rest },
        };
        addSongToDb(songToAdd);
        reset();
    };

    const addTextInput = () => {
        const newInputName = `lyrics-${textInputs.length + 1}`;
        if (textInputs.some(item => item === newInputName)) {
            const time = new Date().valueOf();
            setTextInputs(prevState =>
                [`lyrics-${newInputName}`, ...prevState].sort((a, b) => (a > b ? 1 : -1)),
            );
        } else {
            setTextInputs(prevState => [newInputName, ...prevState].sort((a, b) => (a > b ? 1 : -1)));
        }
    };

    const removeTextInput = id => {
        setTextInputs(textInputs.filter(verse => verse !== id));
        unregister(`${id}-a`);
        unregister(`${id}-b`);
    };

    const handlePreviewChange = () => {
        setPreview(!preview);
    };

    const handleAutoChorusChange = () => {
        setAutoChorus(!autoChorus);

        // unregister hidden chorus inputs
        textInputs.map(input => unregister(`${input}-b`));
    };

    console.log(watch('category'));

    return (
        <>
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <AddSongContainer>
                <AddSongForm onSubmit={handleSubmit(onSubmit)}>

                    <Stack>
                        <Controller
                            name="category"
                            control={control}
                            rules={{
                                required: true,
                                message: 'Choose tags',
                            }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Autocomplete
                                    onChange={(e, data) => onChange(data)}
                                    value={value}
                                    multiple
                                    id="category"
                                    options={categoryOptions}
                                    getOptionLabel={option => option.label}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    defaultValue={[]}
                                    filterSelectedOptions
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label="Choose category tags"
                                            placeholder="Category tags"
                                            error={!!error}
                                        />
                                    )}
                                />
                            )}
                        />
                    </Stack>

                    {/* register your input into the hook by invoking the "register" function */}
                    <TitleContainer>
                        <FormLabel component="legend">Title:</FormLabel>

                        <Title placeholder="Title" {...register('title')} required />
                    </TitleContainer>

                    {textInputs.map((input, i) => (
                        <LyricsContainer key={input}>
                            {textInputs.length !== 1 && (
                                <CustomTooltip
                                    style={{
                                        position: 'absolute',
                                        right: '-20px',
                                        top: 'calc(50% - 20px)',
                                    }}
                                    placement="left"
                                    title={'Remove section'}
                                >
                                    <ButtonRounded onClick={() => removeTextInput(input)} type="alert" />
                                </CustomTooltip>
                            )}
                            <FormLabel component="legend">{`Verse ${i + 1}:`}</FormLabel>
                            <Textarea placeholder="Verse" {...register(`${input}-a`)} required />
                            {!autoChorus && (
                                <>
                                    <FormLabel component="legend">{`Chorus ${i + 1}:`}</FormLabel>
                                    <Textarea placeholder="Chorus" {...register(`${input}-b`)} required />
                                </>
                            )}
                        </LyricsContainer>
                    ))}

                    {autoChorus && (
                        <LyricsContainer>
                            <FormLabel component="legend">Repeatetive Chorus</FormLabel>
                            <Textarea
                                ref="textarea"
                                placeholder="Chorus"
                                {...register(`lyrics-b`)}
                                required
                            />
                        </LyricsContainer>
                    )}

                    <ButtonContainer style={ButtonPosition}>
                        <CustomButton
                            type="button"
                            buttonType={BUTTON_TYPE_CLASSES.transparent}
                            onClick={addTextInput}
                        >
                            + Add another verse +
                        </CustomButton>
                        {/* <ButtonRounded
                            style={{ position: 'absolute', right: '-20px' }}
                            type="add"
                            onClick={addTextInput}
                        /> */}
                    </ButtonContainer>

                    <CheckboxContainer>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="autoComplete"
                                    checked={autoChorus}
                                    onChange={handleAutoChorusChange}
                                />
                            }
                            label="Auto Complete"
                        />
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <FormControlLabel
                            control={
                                <Checkbox name="previev" checked={preview} onChange={handlePreviewChange} />
                            }
                            label="Live Preview"
                        />
                        <InfoTooltip text="Select this option to turn on songs preview" />
                        {/* <CustomTooltip title="Select this option to turn on/off songs preview" /> */}
                    </CheckboxContainer>

                    <TitleContainer>
                        <FormLabel component="legend">YouTube Video URL or ID:</FormLabel>

                        <Title placeholder="YouTube" {...register('youtube')} required />

                        <ExampleContainer>
                            E.g: <span>https://www.youtube.com/watch?v=Q2AXzPqv7gY</span> or{' '}
                            <span>Q2AXzPqv7gY</span>
                        </ExampleContainer>
                    </TitleContainer>
                    {/* include validation with required or other standard HTML validation rules */}
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}

                    <ButtonContainer>
                        <CustomButton type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
                            Submit
                        </CustomButton>
                    </ButtonContainer>
                </AddSongForm>

                {preview && <PreviewForm textInputs={textInputs} watch={watch} autoChorus={autoChorus} />}
            </AddSongContainer>
        </>
    );
};

export default AddSong;

// var url = "...";
// var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
// if(videoid != null) {
//    console.log("video id = ",videoid[1]);
// } else {
//     console.log("The youtube url is not valid.");
// }
