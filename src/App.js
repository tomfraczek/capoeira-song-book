import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
    getSongsAndDocuments,
    getUsersFromDb,
} from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';
import { fetchSongsAsync } from './store/songs/songs.action';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Songbook from './pages/Songbook/Songbook'; //WTF?! :O -.-'
import AddSong from './pages/AddSong';
import Profile from './pages/Profile/Profile'; //WTF?! :O -.-'
import Song from './pages/Song/Song'; //WTF?! :O -.-'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => {
            if (user) {
                createUserDocumentFromAuth(user);
            }

            // const users = getUsersFromDb();
            const { displayName, email, uid, metadata } = user;

            const getUsers = async () => {
                const users = await getUsersFromDb();
                const myFavSongs = users.filter(user => user.uid === uid)[0].myFavSongs;
                dispatch(setCurrentUser({ displayName, email, uid, metadata, myFavSongs }))
            };
            getUsers();
        });


        return unsubscribe;
    }, []);

    return (
        <div className="AppContainer">
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="songbook" element={<Songbook />} />
                    <Route path="auth" element={<Authentication />} />
                    <Route path="add-song" element={<AddSong />} />
                    <Route path="profile/*" element={<Profile />} />
                    <Route path="songbook/song/:id" element={<Song />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
