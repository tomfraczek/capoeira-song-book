import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectSongs } from '../../store/songs/songs.selector';

import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';
import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';

import { SongContentContainer, Title, SongVerse, LyricsContainer } from './Song.styles';

const Song = () => {
    let params = useParams();
    const songs = useSelector(selectSongs);
    const [song, setSong] = useState({});
    const { id } = params;

    useEffect(() => {
        setSong(songs.data.find(song => song.id == id));
        // console.log(orderLyrics({ b: 'adasd', k: 'sadasd', o: 'sadasd', a: 'csd' }));
    }, [songs]);

    useEffect(() => {
        // setSong(songs.data.find(song => song.id == id));
        // console.log(song);
        if (song?.lyrics) {
            const { title, category, lyrics, createdAt, autoComplete, youtube } = song;
            // const orderLyrics = foo =>
            //     Object.keys(foo)
            //         .sort()
            //         .reduce(
            //             (acc, key) => ({
            //                 ...acc,
            //                 [key]: lyrics[key],
            //             }),
            //             {},
            //         );
            // console.log('song');
            console.log(reorderLyrics(song.lyrics));
        }
    }, [song]);

    const reorderLyrics = lyrics =>
        Object.keys(lyrics)
            .sort()
            .reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: lyrics[key],
                }),
                {},
            );

    // const song = songs.find(song => song.id == id);

    // const { title, category, lyrics, createdAt, autoComplete, youtube } = song;

    // const ascLyrics = Object.keys(song.lyrics)
    //     .sort()
    //     .reduce((a, c) => ((a[c] = lyrics[c]), a), {});

    const Lyrics = () => {
        const { title, category, lyrics, createdAt, autoComplete, youtube } = song;
        if (autoComplete) {
            const repeatetive = lyrics['lyrics-b'];
            const removeItem = 'lyrics-b';
            const { [removeItem]: remove, ...finalSong } = lyrics;
            return Object.values(reorderLyrics(lyrics)).map((lyrics, i) => (
                <Fragment key={i}>
                    <SongVerse key={i}>{lyrics}</SongVerse>
                    <SongVerse>{repeatetive}</SongVerse>
                </Fragment>
            ));
        } else {
            return Object.values(reorderLyrics(lyrics)).map((lyrics, i) => (
                <SongVerse key={i}>{lyrics}</SongVerse>
            ));
        }
    };

    return (
        <>
            {song && (
                <>
                    <Title>{song.title}</Title>
                    <CategoryBadge>{song.category}</CategoryBadge>
                    <SongContentContainer>
                        <LyricsContainer>{song?.lyrics && <Lyrics />}</LyricsContainer>

                        {/* <YouTubePlayer src={song.youtube} /> */}
                    </SongContentContainer>
                </>
            )}
            {/* <Title>{song.title}</Title>
            <CategoryBadge>{song.category}</CategoryBadge>
            <SongContentContainer>
                <LyricsContainer>
                    <Lyrics />
                </LyricsContainer>

                <YouTubePlayer src={youtube} />
            </SongContentContainer> */}
        </>
    );
};

export default Song;
