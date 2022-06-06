import YouTube from 'react-youtube';

const YouTubePlayer = ({ src }) => {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const onReady = e => {
        // access to player in all event handlers via event.target
        e.target.pauseVideo();
    };

    // const url = 'Q2AXzPqv7gY';

    const isValidUrl = string => {
        const res = string.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        );

        if (res !== null) {
            const video_id = string.split('v=')[1];
            return video_id;
        }

        return string;
    };

    return <YouTube videoId={isValidUrl(src)} opts={opts} onReady={e => onReady(e)} />;
};

export default YouTubePlayer;
