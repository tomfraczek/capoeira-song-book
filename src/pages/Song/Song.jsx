import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectSongs } from '../../store/songs/songs.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { setSongUpdates } from '../../store/songs/songs.action';
import { updateSongDb } from '../../utils/firebase/firebase.utils';

import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';
import DisplayLyrics from '../../components/DisplayLyrics';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';
import HalfRating from '../../components/HalfRating';

import {
    SongContentContainer,
    Title,
    SongContainer,
    LyricsContainer,
    CtaContainer,
    SongHeader,
} from './Song.styles';
import FavIcon from '../../components/FavIcon';

const Song = () => {
    let params = useParams();
    const songs = useSelector(selectSongs);
    const currentUser = useSelector(selectCurrentUser);
    const [song, setSong] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = params;
    const dispatch = useDispatch();

    useEffect(() => {
        setSong(songs.find(song => song.id === id));
    }, [songs, id]);

    useEffect(() => {
        if (song.youtube !== undefined) {
            setLoading(false);
        }
        if (song) console.log(song);
    }, [song]);

    const handleRating = e => {
        try {
            const updateRating = async () => {
                const newRate = e.target.value;
                const ratingToAdd = {
                    id: id,
                    rating: {
                        score: Number(newRate) + song.rating.score,
                        votes: song.rating.votes + 1,
                    },
                };

                // setRating({ score: rating.score + Number(newRate), votes: rating.votes + 1 });
                console.log(ratingToAdd);

                await updateSongDb(song.id, ratingToAdd);
                dispatch(setSongUpdates(ratingToAdd));
            };
            updateRating();
        } catch (error) {
            console.log('user edit encontered an error', error.message);
        }
    };

    const roundHalf = n => {
        return (Math.round(n * 2) / 2).toFixed(1);
    };

    return (
        <SongContainer>
            {!loading ? (
                <>
                    <SongHeader>
                        <Title>{song.title}</Title>
                        <HalfRating
                            handleRating={handleRating}
                            value={roundHalf(song.rating.score / song.rating.votes)}
                        />
                        <CtaContainer>
                            <FavIcon song={song} id={song.id} />
                        </CtaContainer>
                    </SongHeader>
                    <CategoryBadge category={song.category} />
                    <SongContentContainer>
                        <LyricsContainer>{song.lyrics && <DisplayLyrics song={song} />}</LyricsContainer>
                        <YouTubePlayer src={song.youtube} />
                    </SongContentContainer>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </SongContainer>
    );
};

export default Song;
