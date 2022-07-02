import { Fragment } from 'react';
import { SongVerse } from './DisplayLyrics.styles';

const DisplayLyrics = ({ song }) => {
    const { title, category, lyrics, createdAt, autoComplete, youtube } = song;

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

export default DisplayLyrics;
