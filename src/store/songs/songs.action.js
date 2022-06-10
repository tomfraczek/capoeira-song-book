import { createAction } from "../../utils/reducer/reducer.utils";
import { SONGS_ACTION_TYOES } from "./songs.type";

export const setSongs = (songs) => createAction(SONGS_ACTION_TYOES.SET_SONGS, songs)