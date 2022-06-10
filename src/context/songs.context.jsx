import { createContext, useEffect, useReducer } from 'react';

import { getSongsAndDocuments } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

export const SongsContext = createContext({
    songs: [],
});

export const SONGS_ACTION_TYPES = {
    GET_SONGS: 'GET_SONGS',
};

const songsReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SONGS_ACTION_TYPES.GET_SONGS:
            return {
                ...state,
                songs: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in the songsReducer`);
    }
};

const INITIAL_STATE = {
    songs: [],
};

export const SongsProvider = ({ children }) => {
    const [{ songs }, dispatch] = useReducer(songsReducer, INITIAL_STATE);

    const setSongs = songs => {
        dispatch(createAction(SONGS_ACTION_TYPES.GET_SONGS, songs));
    };

    useEffect(() => {
        const getSongsMap = async () => {
            const songsMap = await getSongsAndDocuments();
            setSongs(songsMap);
        };

        getSongsMap();
    }, []);

    const value = { songs };
    return <SongsContext.Provider value={value}>{children}</SongsContext.Provider>;
};
