import { createAction } from '../../utils/reducer/reducer.utils';
import { SONGS_ACTION_TYPES } from './songs.type';

import { getSongsAndDocuments } from '../../utils/firebase/firebase.utils';

export const fetchSongsStart = () => {
    return createAction(SONGS_ACTION_TYPES.FETCH_SONGS_START);
};

export const fetchSongsSuccess = songs => {
    return createAction(SONGS_ACTION_TYPES.FETCH_SONGS_SUCCESS, songs);
};

export const fetchSongsFailed = error => {
    return createAction(SONGS_ACTION_TYPES.FETCH_SONGS_FAILED, error);
};

export const fetchSongsAsync = () => {
    return async dispatch => {
        dispatch(fetchSongsStart());

        try {
            const songs = await getSongsAndDocuments();
            dispatch(fetchSongsSuccess(songs));
        } catch (error) {
            dispatch(fetchSongsFailed(error));
        }
    };
};

export const setSongUpdates = updates => {
    return createAction(SONGS_ACTION_TYPES.UPDATE_SONG, updates);
};

export const resetSongs = () => {
    return createAction(SONGS_ACTION_TYPES.RESET_SONGS);
};