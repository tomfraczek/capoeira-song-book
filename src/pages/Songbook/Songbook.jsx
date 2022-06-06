import { useContext, useEffect, useState } from 'react';
import { SongsContext } from '../../context/songs.context';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import SongPreview from '../../components/SongCardPreview/SongCardPreview';
import SearchForm from '../../components/SearchForm/SearchForm';

import { SongbookContainer } from './Songbook.styles';

const Songbook = () => {
    const { songs } = useContext(SongsContext);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        getCategoriesAndDocuments();
    }, []);

    useEffect(() => {
        if (query === '') {
            setResults(songs);
        } else {
            const result = songs
                .filter(
                    song =>
                        song.title?.toLowerCase().includes(query.toLowerCase()) ||
                        Object.values(song.lyrics)?.some(l => l.toLowerCase().includes(query.toLowerCase())),
                )
                .map(r => r);
            setResults(result);
        }
    }, [query, songs]);

    const DisplayResults = () => {
        if (results.length) {
            return results.map((result, i) => <SongPreview key={i} song={result} />);
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
