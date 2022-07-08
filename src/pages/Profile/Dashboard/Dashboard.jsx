import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectUsersFavSongs } from '../../../store/user/user.selector';
import { selectUsersSongs, selectSongs } from '../../../store/songs/songs.selector';

import { DashboardContainer } from './Dashboard.styles';

const Dashboard = () => {
    const currentUser = useSelector(selectCurrentUser);
    const currentUsersSongs = useSelector(selectUsersSongs);
    const favSongs = useSelector(selectUsersFavSongs);
    const allSongs = useSelector(selectSongs);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUsersSongs, currentUser, favSongs]);

    // const getFavorites = allSongs.filter(song => currentUser.myFavSongs.map(fav => fav === song.id));
    const getFavorites = currentUser.myFavSongs.map(fav => allSongs.filter(song => song.id === fav));
    const getUswersSongs = allSongs.filter(song => song.addedBy === currentUser.uid);

    return (
        <DashboardContainer>
            {user && (
                <>
                    <h1>Bom dia {user.displayName}</h1>
                    <div>Your Email: {user.email}</div>
                    <div>There are {allSongs.length} songs in the database!</div>
                    <div>{`Your songs in the songbook: ${getUswersSongs ? getUswersSongs.length : '0'}`}</div>
                    <div>{`Favorite songs: ${getFavorites ? getFavorites.length : '0'}`}</div>
                </>
            )}
        </DashboardContainer>
    );
};

export default Dashboard;
