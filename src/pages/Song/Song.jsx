import { useContext, useEffect } from 'react';
import { SongsContext } from '../../context/songs.context';
import { useParams } from 'react-router-dom';

import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';

import { SongContentContainer, Title, SongVerse, LyricsContainer } from './Song.styles';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';
// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const Song = () => {
    const { songs } = useContext(SongsContext);
    let params = useParams();
    const { id } = params;

    const song = songs.find(song => song.id == id);
    const { title, category, lyrics, createdAt, autoComplete, youtube } = song;
    const ascLyrics = Object.keys(lyrics)
        .sort()
        .reduce((a, c) => ((a[c] = lyrics[c]), a), {});

    const Lyrics = () => {
        if (autoComplete) {
            const repeatetive = ascLyrics['lyrics-b'];
            const removeItem = 'lyrics-b';
            const { [removeItem]: remove, ...finalSong } = ascLyrics;
            return Object.values(finalSong).map((lyrics, i) => (
                <>
                    <SongVerse key={i}>{lyrics}</SongVerse>
                    <SongVerse>{ascLyrics['lyrics-b']}</SongVerse>
                </>
            ));
        } else {
            return Object.values(ascLyrics).map((lyrics, i) => <SongVerse key={i}>{lyrics}</SongVerse>);
        }
    };

    return (
        <>
            <Title>{title}</Title>
            <CategoryBadge>{category}</CategoryBadge>
            <SongContentContainer>
                <LyricsContainer>
                    <Lyrics />
                </LyricsContainer>

                <YouTubePlayer src={youtube} />
            </SongContentContainer>
        </>
    );
};

export default Song;
