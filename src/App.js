import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { UserContext } from './context/user.context';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Songbook from './pages/Songbook/Songbook'; //WTF?! :O -.-'
import AddSong from './pages/AddSong';
import Profile from './pages/Profile/Profile';
import Song from './pages/Song/Song';

const App = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div className='AppContainer'>
            <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={currentUser ? <Songbook /> : <Home />} />
                <Route path='songbook' element={<Songbook />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="add-song" element={<AddSong />} />
                <Route path="profile" element={<Profile />} />
                <Route path="songbook/song/:id" element={<Song />} />
            </Route>
        </Routes>
        </div>
    );
};

export default App;
