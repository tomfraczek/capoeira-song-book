import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectSongs } from '../../store/songs/songs.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { fetchSongsAsync } from '../../store/songs/songs.action';

import SongCardPreview from '../../components/SongCardPreview/SongCardPreview';
import SearchForm from '../../components/SearchForm/SearchForm';

import { SongbookContainer } from './Songbook.styles';

const Songbook = () => {
    const songs = useSelector(selectSongs);
    const currentUser = useSelector(selectCurrentUser);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSongsAsync());
    }, []);

    useEffect(() => {
        if (query === '') {
            setResults(songs);
        } else {
            const result = songs
                .filter(
                    song =>
                        song.title?.toLowerCase().includes(query.toLowerCase()) ||
                        Object.values(song.lyrics)?.some(l =>
                            l.toString().toLowerCase().includes(query.toLowerCase()),
                        ),
                )
                .map(r => r);
            setResults(result);
        }
    }, [query, songs]);

    const DisplayResults = () => {
        if (results && currentUser && results.length) {
            const favSongs = currentUser.myFavSongs;
            return results.map((result, i) => (
                <SongCardPreview key={i} song={result} fav={favSongs.includes(result.id)} />
            ));
        }

        return <p>No results found</p>;
    };

    return (
        <>
            <SearchForm onChange={e => setQuery(e.target.value)} />
            <SongbookContainer>
                <DisplayResults />
            </SongbookContainer>
        </>
    );
};

export default Songbook;
