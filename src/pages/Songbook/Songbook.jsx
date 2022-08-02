import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectSongs } from '../../store/songs/songs.selector';
import { selectLoading } from '../../store/songs/songs.selector';
import { fetchSongsAsync } from '../../store/songs/songs.action';

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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSongsAsync());
    }, []);

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
    
    const tags = ['corrido', 'ladainha', 'maculele', 'samba', 'quadras'];
console.log(results)
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
                    // <DisplaySongsTable data={results} types={checkboxesValues} />
                    // <DisplaySongsTable data={results} types={['ladainha']} />
                    <DisplaySongsTable data={results} types={null} />
                )}
            </TableContainer>
        </SongbookContainer>
    );
};

export default Songbook;
