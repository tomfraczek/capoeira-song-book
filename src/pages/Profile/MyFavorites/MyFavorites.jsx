import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DisplaySongsTable from '../../../components/DisplaySongsTable';
import SongCardPreview from '../../../components/SongCardPreview';
import { selectCurrentUserFavs } from '../../../store/user/user.selector';

import { NoSongNotification, MyFavoritesContainer } from './MyFavorites.styles';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { selectLoading } from '../../../store/songs/songs.selector';
import LoadingCircle from '../../../components/LoadingCircle/LoadingCircle';



const MyFavorites = () => {
    const currentUserFavs = useSelector(selectCurrentUserFavs);
    const isLoading = useSelector(selectLoading);

    console.log(currentUserFavs);

    return (
        <>
            {isLoading ? (
                <LoadingCircle />
            ) : (
                <MyFavoritesContainer>
                    {currentUserFavs && currentUserFavs.length > 0 ? (
                        <DisplaySongsTable data={currentUserFavs} />
                    ) : (
                        <NoSongNotification>
                            <Link to="/songbook">
                                <AddBoxIcon />
                                <p>You have no favorite songs. Add some to display them here.</p>
                            </Link>
                        </NoSongNotification>
                    )}
                </MyFavoritesContainer>
            )}
        </>
    );
};

export default MyFavorites;
