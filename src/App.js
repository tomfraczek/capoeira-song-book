import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
    getUsersFromDb,
} from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';

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
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navigation from './components/Navigation';

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
            {isUserLogged ? (
                <>
                <Navigation navType='profile'/>
                 <div style={{ display: 'flex' }}>
                    <UserDrawer />
                    <Routes>
                        
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="favorites" element={<MyFavorites />} />
                        <Route path="my-songs" element={<MySongs />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="edit-profile" element={<EditProfile />} />
                        <Route path="new-song" element={<NewSong />} />
                        <Route path="songbook" element={<Songbook />} />
                        {/* <Route path="auth" element={<Authentication />} /> */}
                        <Route path="add-song" element={<AddSong />} />
                        <Route path="profile/*" element={<Profile />} />
                        <Route path="songbook/song/:id" element={<Song />} />
                    </Routes>
                </div>
                </>
               
            ) : (
                <Routes>
                    <Route index element={<SignIn />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            )}
        </div>
    );
};

export default App;
