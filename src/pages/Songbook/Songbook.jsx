import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { selectSongs } from '../../store/songs/songs.selector';
import { selectLoading } from '../../store/songs/songs.selector';

import SearchForm from '../../components/SearchForm/SearchForm';
import DisplaySongsTable from '../../components/DisplaySongsTable';
import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';

import { SongbookContainer, TableContainer } from './Songbook.styles';

const Songbook = () => {
    const songs = useSelector(selectSongs);
    const isLoading = useSelector(selectLoading);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [checkboxesValues, setCheckboxesValues] = useState([
        'corrido',
        'ladainha',
        'maculele',
        'quadra',
        'samba',
    ]);

    useEffect(() => {
        console.log(isLoading);
    }, [isLoading]);

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

    const typeHandler = e => {
        const { value } = e.target;
        if (!checkboxesValues.includes(value)) {
            setCheckboxesValues([...checkboxesValues, value]);
        } else {
            setCheckboxesValues(checkboxesValues.filter(type => type !== value));
        }
    };
    
    return (
        <SongbookContainer>
            <SearchForm
                handleSearchInput={e => setQuery(e.target.value)}
                handleTypes={typeHandler}
                checkboxesValues={checkboxesValues}
            />
            <TableContainer style={{ alignSelf: 'center' }}>
                {isLoading ? (
                    <LoadingCircle />
                ) : (
                    <DisplaySongsTable data={results} types={checkboxesValues} />
                )}
            </TableContainer>
        </SongbookContainer>
    );
};

export default Songbook;
