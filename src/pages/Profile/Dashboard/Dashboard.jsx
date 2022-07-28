import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentUserFavs } from '../../../store/user/user.selector';
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
    const currentUserFavs = useSelector(selectCurrentUserFavs);
    const allSongs = useSelector(selectSongs);
    // const [data, setData] = useState({});

   

    // useEffect(() => {
    //     const data = {
    //         labels: ['Songs', 'Translations', 'Rates', 'Favorites'],
    //         datasets: [
    //             {
    //                 label: 'Added:',
    //                 data: [currentUsersSongs.length, 9, 3, currentUserFavs.length],
    //                 backgroundColor: '#73a24e',
    //                 borderColor: '#416a59',
    //                 borderWidth: 1,
    //             },
    //         ],
    //         options: {
    //             scales: {
    //                 y: {
    //                     beginAtZero: true,
    //                 },
    //             },
    //         },
    //     };
    //     setData(data);
    // }, [currentUserFavs, currentUsersSongs]);

  

    console.log(currentUsersSongs);
    console.log(currentUserFavs)

    return (
        <DashboardContainer>
            <p style={{ textAlign: 'center' }}>Dashboard</p>
            {/* <TextEditor /> */}
            {/* {currentUser && (
                <>
                    <GreetingUser name={currentUser.displayName} />
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
