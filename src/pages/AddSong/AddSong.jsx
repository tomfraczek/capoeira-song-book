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
} from '@mui/material';

import { addSongToDb, updateUser, getCurrentUser } from '../../utils/firebase/firebase.utils';

import { selectCurrentUser } from '../../store/user/user.selector';

import PreviewForm from '../../components/PreviewForm/PreviewForm';

import {
    Title,
    Textarea,
    RadioContainer,
    AddSongContainer,
    Header,
    AddSongForm,
    LyricsContainer,
    RemoveButton,
    TitleContainer,
    HeaderContainer,
    CheckboxContainer,
    ExampleContainer,
} from './AddSong.styles';

import remove from './assets/remove.png';

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
            category: '',
        },
    });

    useEffect(() => {
        console.log(currentUser.uid);
    }, [currentUser]);

    const onSubmit = data => {
        const { title, category, youtube, ...rest } = data;
        const createdAt = new Date();
        const songToAdd = {
            category,
            title,
            createdAt,
            youtube,
            autoComplete: autoChorus,
            addedBy: userId,
            lyrics: { ...rest },
        };
        addSongToDb(songToAdd, category);
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

    return (
        <>
            <HeaderContainer>
                <Header>Add a song</Header>
                <CheckboxContainer>
                    <label htmlFor="previev">Preview</label>
                    <input type="checkbox" name="previev" checked={preview} onChange={handlePreviewChange} />
                </CheckboxContainer>
            </HeaderContainer>
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <AddSongContainer>
                <AddSongForm onSubmit={handleSubmit(onSubmit)}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Type:</FormLabel>
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            name="category"
                            render={({ field }) => {
                                return (
                                    <RadioContainer as={RadioGroup} {...field}>
                                        <FormControlLabel
                                            value="corridos"
                                            control={<Radio />}
                                            label="Corrido"
                                        />
                                        <FormControlLabel
                                            value="ladainha"
                                            control={<Radio />}
                                            label="Ladainha"
                                        />
                                        <FormControlLabel
                                            value="maculele"
                                            control={<Radio />}
                                            label="Maculele"
                                        />
                                        <FormControlLabel value="quadra" control={<Radio />} label="Quadra" />
                                        <FormControlLabel
                                            value="samba de roda"
                                            control={<Radio />}
                                            label="Samba de Roda"
                                        />
                                    </RadioContainer>
                                );
                            }}
                        />
                    </FormControl>

                    {/* register your input into the hook by invoking the "register" function */}
                    <TitleContainer>
                        <FormLabel component="legend">Title:</FormLabel>

                        <Title placeholder="Title" {...register('title')} required />
                    </TitleContainer>

                    {textInputs.map((input, i) => (
                        <LyricsContainer key={input}>
                            {textInputs.length !== 1 && (
                                <RemoveButton onClick={() => removeTextInput(input)}>
                                    <img src={remove} />
                                </RemoveButton>
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
                            <Textarea placeholder="Chorus" {...register(`lyrics-b`)} required />
                        </LyricsContainer>
                    )}

                    <CheckboxContainer>
                        <input
                            type="checkbox"
                            name="chorus"
                            checked={autoChorus}
                            onChange={handleAutoChorusChange}
                        />
                        <label htmlFor="chorus">Auto Complete</label>
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
                    <button type="button" onClick={addTextInput}>
                        Add text
                    </button>

                    <input type="submit" />
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
