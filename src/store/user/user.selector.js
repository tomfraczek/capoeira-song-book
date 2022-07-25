export const selectCurrentUser = state => state.user.currentUser;

// export const selectUsersFavSongs = state => state.currentUser && state.user.currentUser.myFavSongs;

export const selectUsersPlaylists = state => state.user.currentUser.playlists;
