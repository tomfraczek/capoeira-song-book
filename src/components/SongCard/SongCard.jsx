import { Link } from 'react-router-dom';

const SongCard = ({ song, key }) => {
    const { title, lyrics, id } = song;
    // console.log(song);
    return (
        <div className="song-card-container">
            <h1>{title}</h1>
            {/* <p>{lyrics.substring(0, 100)}...</p> */}
            <Link to={`${id}`}>Continue reading</Link>
        </div>
    );
};

export default SongCard;
