import { useSelector, useState, useEffect } from 'react-redux';
import { selectCurrentUser } from '../../../store/user/user.selector';

const Dashboard = () => {
    const currentUser = useSelector(selectCurrentUser);
    // const [user, setUser] =

    return <>Dashboard</>;
};

export default Dashboard;
