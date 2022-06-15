import { Routes, Route } from 'react-router-dom';

import ProfileDrawer from '../../components/ProfileDrawer';
import Dashboard from './Dashboard';
import SavedSongs from './SavedSongs';
import MySongs from './MySongs';
import Notifications from './Notifications';
import EditProfile from './EditProfile';

import { ProfileContainer } from './Profile.styles';

const Profile = () => (
    <ProfileContainer>
        <ProfileDrawer />

        <Routes>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="favorites" element={<SavedSongs />} />
            <Route path="my-songs" element={<MySongs />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="edit-profile" element={<EditProfile />} />
        </Routes>
    </ProfileContainer>
);

export default Profile;
