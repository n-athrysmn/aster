// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyDpVQAYN4LMCCZLnNW9pnLiadUp0nIXkAs',
	authDomain: 'aster-3a180.firebaseapp.com',
	projectId: 'aster-3a180',
	storageBucket: 'aster-3a180.appspot.com',
	messagingSenderId: '561641558300',
	appId: '1:561641558300:web:2c50e05d706f5f5ae46ad9',
}

firebase.initializeApp(firebaseConfig)

const storageRef = firebase.storage().ref()

export default storageRef
