import SONGS_DATA from '../../songbook-data';

const SongBook = () => {
    return (
        <div>
            {SONGS_DATA.map(({ id, title }) => (
                <div key={id}>
                    <h1>{title}</h1>
                </div>
            ))}
        </div>
    );
};

export default SongBook;
