export const selectSongs = state => state.songs.data;

export const selectUsersSongs = state => {
    if (state.currentUser) {
        console.log(state.currentUser);
        return state.songs.data.filter(song => song.addedBy === state.user.currentUser.uid);
    }
};
