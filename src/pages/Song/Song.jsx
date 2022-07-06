import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectSongs } from '../../store/songs/songs.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';
import DisplayLyrics from '../../components/DisplayLyrics';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';

import { SongContentContainer, Title, SongContainer, LyricsContainer, CtaContainer } from './Song.styles';
import FavIcon from '../../components/FavIcon';

const Song = () => {
    let params = useParams();
    const songs = useSelector(selectSongs);
    const currentUser = useSelector(selectCurrentUser);
    const [song, setSong] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = params;

    useEffect(() => {
        setSong(songs.find(song => song.id == id));
    }, [songs]);

    useEffect(() => {
        console.log(song);

        if (song.youtube !== undefined) {
            setLoading(false);
        }
    }, [song]);

    return (
        <SongContainer>
            {!loading ? (
                <>
                    <Title>{song.title}</Title>
                    <CtaContainer>
                        <FavIcon song={song} />
                    </CtaContainer>
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
