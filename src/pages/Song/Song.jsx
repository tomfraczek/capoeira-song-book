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
    const { id } = params;

    useEffect(() => {
        setSong(songs.find(song => song.id == id));
    }, [songs]);

    return (
        <SongContainer>
            {song && (
                <>
                    <Title>{song.title}</Title>
                    <CtaContainer>
                        <FavIcon />
                    </CtaContainer>
                    <CategoryBadge>{song.category}</CategoryBadge>
                    <SongContentContainer>
                        <LyricsContainer>{song?.lyrics && <DisplayLyrics song={song} />}</LyricsContainer>

                        {/* <YouTubePlayer src={song.youtube} /> */}
                    </SongContentContainer>
                </>
            )}
        </SongContainer>
    );
};

export default Song;
