export const selectCurrentUser = state => state.user.currentUser;

export const selectCurrentUserFavs = state => {
    if (state.user.currentUser) {
        return state.songs.data.filter(song => state.user.currentUser.myFavSongs.includes(song.id));
    }
};

export const selectUsersPlaylists = state => state.user.currentUser.playlists;
