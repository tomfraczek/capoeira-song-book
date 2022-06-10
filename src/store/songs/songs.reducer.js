import { SONGS_ACTION_TYOES } from "./songs.type";

export const SONGS_INITIAL_STATE = {
    data: [],
};

export const songsReducer = (state = SONGS_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case SONGS_ACTION_TYOES.SET_SONGS:
            return { ...state, data: payload };
        default:
          return state;
    }
};
