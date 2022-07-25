import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/user/user.selector';
import { selectUsersSongs, selectSongs } from '../../../store/songs/songs.selector';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import GreetingUser from '../../../components/GreetingUser/GreetingUser';

import { DashboardContainer, RadarContainer } from './Dashboard.styles';
import TextEditor from '../../../components/TextEditor/TextEditor';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Dashboard = () => {
    const currentUser = useSelector(selectCurrentUser);
    const currentUsersSongs = useSelector(selectUsersSongs);
    // const favSongs = useSelector(selectUsersFavSongs);
    const allSongs = useSelector(selectSongs);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUsersSongs, currentUser]);

    // const getFavorites = allSongs.filter(song => currentUser.myFavSongs.map(fav => fav === song.id));
    // const getFavorites = currentUser.myFavSongs.map(fav => allSongs.filter(song => song.id === fav));
    // const getUsersSongs = allSongs.filter(song => song.addedBy === currentUser.uid);

    // const data = {
    //     labels: ['Songs', 'Translations', 'Rates', 'Favorites'],
    //     datasets: [
    //         {
    //             label: 'Added:',
    //             data: [getUsersSongs.length, 9, 3, getFavorites.length],
    //             backgroundColor: '#73a24e',
    //             borderColor: '#416a59',
    //             borderWidth: 1,
    //         },
    //     ],
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true,
    //             },
    //         },
    //     },
    // };

    return (
        <DashboardContainer>
            {/* <TextEditor /> */}
            {/* {user && (
                <>
                    <GreetingUser name={user.displayName} />
                    <div style={{ color: '#416a59' }}>Your rank is Aluno</div>
                    <RadarContainer>
                        <p style={{ color: '#416a59' }}>Your stats:</p>
                        <Radar data={data} />
                    </RadarContainer>
                </>
            )} */}
        </DashboardContainer>
    );
};

export default Dashboard;
