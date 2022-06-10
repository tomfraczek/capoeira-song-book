import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { songsReducer } from './songs/songs.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  songs: songsReducer,
})
