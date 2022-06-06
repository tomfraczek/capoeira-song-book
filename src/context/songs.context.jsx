import { createContext, useEffect, useState } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const SongsContext = createContext({
    songs: [],
});

export const SongsProvider = ({ children }) => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const getSongsMap = async () => {
            const songsMap = await getCategoriesAndDocuments();
            setSongs(songsMap);
        };

        getSongsMap();
    }, []);

    const value = { songs };
    return <SongsContext.Provider value={value}>{children}</SongsContext.Provider>;
};
