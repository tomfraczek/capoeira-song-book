import { useContext, useEffect, useState } from 'react';
import { getSongsAndDocuments } from '../../utils/firebase/firebase.utils';

import { useDispatch, useSelector } from 'react-redux';

import { setSongs } from '../../store/songs/songs.action';
import { selectSongs } from '../../store/songs/songs.selector';

import SongCardPreview from '../../components/SongCardPreview/SongCardPreview';
import SearchForm from '../../components/SearchForm/SearchForm';

import { SongbookContainer } from './Songbook.styles';

const Songbook = () => {
    const songs = useSelector(selectSongs);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        getSongsAndDocuments();
    }, []);

    // useEffect(() => {
    //     if (songs.data) {
    //         console.log(
    //             songs.data.map(song =>
    //                 Object.values(song.lyrics).some(l => l.toString().toLowerCase().includes('historia')),
    //             ),
    //         );
    //     }
    // }, [songs]);

    useEffect(() => {
        if (query === '') {
            setResults(songs.data);
        } else {
            const result = songs.data
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
        if (results && results.length) {
            return results.map((result, i) => <SongCardPreview key={i} song={result} />);
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

// console.log(
//     songs.data
//         .filter(
//             song => Object.values(song.lyrics)?.some(l => l),
//             //  ||
//             // Object.values(song.lyrics)?.some(l => l.toLowerCase().includes(query.toLowerCase())),
//         )
//         .map(r => r.lyrics),
// );
