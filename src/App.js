import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
    getUsersFromDb,
} from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Songbook from './pages/Songbook/Songbook'; //WTF?! :O -.-'
import AddSong from './pages/AddSong';
import Profile from './pages/Profile/Profile'; //WTF?! :O -.-'
import Song from './pages/Song/Song'; //WTF?! :O -.-'
import UserDrawer from './components/UserDrawer/UserDrawer';
import Dashboard from './pages/Profile/Dashboard';
import MyFavorites from './pages/Profile/MyFavorites';
import MySongs from './pages/Profile/MySongs';
import Notifications from './pages/Profile/Notifications';
import EditProfile from './pages/Profile/EditProfile';
import NewSong from './pages/Profile/NewSong';

const App = () => {
    const [isUserLogged, setIsUserLogged] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => {
            if (user) {
                setIsUserLogged(true);
                createUserDocumentFromAuth(user);
                const { displayName, email, uid, metadata } = user;

                const dispatchUser = async () => {
                    const users = await getUsersFromDb();
                    let myFavSongs;
                    if (users.filter(user => user.uid === uid)[0].myFavSongs === undefined) {
                        myFavSongs = [];
                    } else {
                        myFavSongs = users.filter(user => user.uid === uid)[0].myFavSongs;
                    }
                    dispatch(setCurrentUser({ displayName, email, uid, metadata, myFavSongs }));
                };

                dispatchUser();
            } else {
                setIsUserLogged(false);
            }
        });
        // setIsUserLogged(false);
        return unsubscribe;
    }, []);

    return (
        <div className="AppContainer">
            <Navigation />
            <div style={{ display: 'flex' }}>
                {isUserLogged ? (
                    <>
                        <UserDrawer />
                        <Routes>
                            <Route index element={<Dashboard />} />
                            <Route path="capoeira-songbook/dashboard" element={<Dashboard />} />
                            <Route path="capoeira-songbook/favorites" element={<MyFavorites />} />
                            <Route path="capoeira-songbook/my-songs" element={<MySongs />} />
                            <Route path="capoeira-songbook/notifications" element={<Notifications />} />
                            <Route path="capoeira-songbook/edit-profile" element={<EditProfile />} />
                            <Route path="capoeira-songbook/new-song" element={<NewSong />} />
                            <Route path="capoeira-songbook/songbook" element={<Songbook />} />
                            <Route path="capoeira-songbook/auth" element={<Authentication />} />
                            <Route path="capoeira-songbook/add-song" element={<AddSong />} />
                            <Route path="capoeira-songbook/profile/*" element={<Profile />} />
                            <Route path="capoeira-songbook/songbook/song/:id" element={<Song />} />
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route index element={<Authentication />} />
                    </Routes>
                )}
            </div>
        </div>
    );
};

export default App;
