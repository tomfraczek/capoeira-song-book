import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user/user.selector';
import { selectUsersSongs, selectSongs } from '../../../store/songs/songs.selector';

import { DashboardContainer } from './Dashboard.styles';

const Dashboard = () => {
    const currentUser = useSelector(selectCurrentUser);
    const currentUsersSongs = useSelector(selectUsersSongs);
    const allSongs = useSelector(selectSongs);
    const [user, setUser] = useState(null);
    const [songs, setSongs] = useState(null);

    useEffect(() => {
        setUser(currentUser);
        setSongs(currentUsersSongs);
    }, [currentUsersSongs, currentUser]);

    return (
        <DashboardContainer>
            {user && user && (
                <>
                    <h1>Bom dia {user.displayName}</h1>
                    <div>Your Email: {user.email}</div>
                    <div>There are {allSongs.length} songs in the database!</div>
                    <div>{`Your songs in the songbook: ${songs.length}`}</div>
                    <div>{`Favorite songs: ${songs.length}`}</div>
                </>
            )}
        </DashboardContainer>
    );
};

export default Dashboard;
