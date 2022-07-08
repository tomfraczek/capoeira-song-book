import { SONGS_ACTION_TYPES } from './songs.type';

export const SONGS_INITIAL_STATE = {
    data: [],
    isLoading: false,
    error: null,
};

export const songsReducer = (state = SONGS_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case SONGS_ACTION_TYPES.FETCH_SONGS_START:
            return { ...state, isLoading: true };
        case SONGS_ACTION_TYPES.FETCH_SONGS_SUCCESS:
            return { ...state, data: payload, isLoading: false };
        case SONGS_ACTION_TYPES.FETCH_SONGS_FAILED:
            return { ...state, error: payload, isLoading: false };
        case SONGS_ACTION_TYPES.UPDATE_SONG:
            // return state;
            const { id, rating } = payload;
            // This returns a new array instead of mutating the old one
            return {
                ...state,
                data: state.data.map(song => {
                    if (song.id === id) {
                        song.rating = rating;
                    }
                    return song;
                }),
            };
        default:
            return state;
    }
};
