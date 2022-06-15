export const selectSongs = state => state.songs;

export const selectUsersSongs = state => state.songs.data.filter(song => song.addedBy === state.user.currentUser.uid);
