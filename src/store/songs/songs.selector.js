export const selectSongs = state => state.songs.data;

export const selectUsersSongs = state => {
    if (state.user.currentUser) {
        return state.songs.data.filter(song => song.addedBy === state.user.currentUser.uid);
    }
};

export const selectLoading = state => state.songs.isLoading;
