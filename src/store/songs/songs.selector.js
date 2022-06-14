export const selectSongs = state => state.songs;

export const selctUsersSongs = state => state.songs.data.filter(song => song.addedBy === state.user.currentUser.uid);
