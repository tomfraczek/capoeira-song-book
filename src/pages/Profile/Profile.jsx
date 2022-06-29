import { Routes, Route } from 'react-router-dom';

import ProfileDrawer from '../../components/ProfileDrawer';
import Dashboard from './Dashboard';
import MyFavorites from './MyFavorites';
import MySongs from './MySongs';
import Notifications from './Notifications';
import EditProfile from './EditProfile';
import NewSong from './NewSong';

import { ProfileContainer } from './Profile.styles';

const Profile = () => (
    <ProfileContainer>
        <ProfileDrawer />

        <Routes>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="favorites" element={<MyFavorites />} />
            <Route path="my-songs" element={<MySongs />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="new-song" element={<NewSong />} />
        </Routes>
    </ProfileContainer>
);

export default Profile;
