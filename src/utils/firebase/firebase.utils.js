import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
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
    Firestore,
    updateDoc,
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
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const currentUser = auth.currentUser;

//sign in with google

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const signInWithGooglePopup = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const { displayName } = res.user;
    console.log(displayName)
    createUserDocumentFromAuth(res.user, { displayName })
};




// export methods
export const createUserDocumentFromAuth = async (userAuth, aditionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { email } = userAuth;
        const createdAt = new Date();
        const uid = userDocRef.id;

        try {
            await setDoc(userDocRef, {
                email,
                createdAt,
                uid,
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
    try {
        const newSongRef = doc(collection(db, 'songs'));

        objectToAdd = { ...objectToAdd, id: newSongRef.id };

        await setDoc(doc(db, 'songs', newSongRef.id), objectToAdd);
        console.log('Song added to db');
    } catch (error) {
        console.log('error creating the document', error);
    }
};

export const updateUser = async (id, updates) => {
    const userRef = doc(db, 'users', id);
    console.log(id, updates);

    await updateDoc(userRef, updates);
};

export const getSongsAndDocuments = async () => {
    const collectionRef = collection(db, 'songs');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const songs = querySnapshot.docs.map(doc => doc.data());

    return songs;
};

export const getCurrentUser = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            return user;
        }
        return;
    });
};

export const updateUserProfile = async data => {
    try {
        await updateProfile(auth.currentUser, data);
    } catch (error) {
        console.log('An Error Ocured in updateUserProfile methoid ', error);
    }
};

export const getUsersFromDb = async () => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map(doc => doc.data());

    return users;
};

export const updateSongDb = async (id, updates) => {
    const songRef = doc(db, 'songs', id);
    await updateDoc(songRef, updates);
};

export const getUserById = async id => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map(doc => doc.data());
    const user = users.filter(user => user.uid === id);
    return user[0];
};
