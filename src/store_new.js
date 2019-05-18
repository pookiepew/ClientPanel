import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

// Reducers
// @todo

const firebaseConfig = {
    apiKey: "AIzaSyBcBkpX-od7FaSUZ8wStcE_-IMhXYRvO-Q",
    authDomain: "clientpanel-75f64.firebaseapp.com",
    databaseURL: "https://clientpanel-75f64.firebaseio.com",
    projectId: "clientpanel-75f64",
    storageBucket: "clientpanel-75f64.appspot.com",
    messagingSenderId: "887362119467",
    appId: "1:887362119467:web:47dc7743f1f14c51"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Init firebase instance
firebase.initializeApp(firebaseConfig)

// Init firestore
// const firestore = firebase.firestore()

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    ReactReduxFirebaseProvider(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase)
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer 
})

// Create initial state
const initialState = {}

// Create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase, rrfConfig),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store