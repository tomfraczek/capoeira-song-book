import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    docs,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    addDoc,
    query,
    getDocs,
} from 'firebase/firestore';

// Firebase Config
const firebaseConfig = {
    apiKey: 'AIzaSyC3nlO2Kh_z7ba1iCB5nlm7xUmBb2Tw8bc',
    authDomain: 'capoeira-songbook.firebaseapp.com',
    projectId: 'capoeira-songbook',
    storageBucket: 'capoeira-songbook.appspot.com',
    messagingSenderId: '523638299997',
    appId: '1:523638299997:web:04c72d12642f5e5862dcb4',
    measurementId: 'G-2PNY88MV8F',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

// export methods
export const createUserDocumentFromAuth = async (userAuth, aditionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...aditionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = callback => onAuthStateChanged(auth, callback);

export const addSongToDb = async objectToAdd => {
    console.log('Song added to dasdasd');
    try {
        const newCityRef = doc(collection(db, "songs"));

        await addDoc(collection(db, 'songs'), {
            ...objectToAdd,
            id: newCityRef.id
        });
        console.log('Song added to db');
    } catch (error) {
        console.log('error creating the document', error);
    }
};

export const getSongsAndDocuments = async () => {
    const collectionRef = collection(db, 'songs');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const songsMap = querySnapshot.docs.map(doc => doc.data());

    return songsMap;
};
