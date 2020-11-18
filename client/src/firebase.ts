import firebase from 'firebase/app';
import 'firebase/auth';
import type { User } from './types';

const firebaseConfig = {
  apiKey: 'AIzaSyCwf2j3hl6d3Km5_IrC8j7uPz-InWGZdZs',
  authDomain: 'reporter-34062.firebaseapp.com',
  databaseURL: 'https://reporter-34062.firebaseio.com',
  projectId: 'reporter-34062',
  storageBucket: 'reporter-34062.appspot.com',
  messagingSenderId: '70784236121',
  appId: '1:70784236121:web:5d81344d682434f70e0f48',
  measurementId: 'G-WGK3HMTBVT',
};

export const defaultUser: User = {
  id: 'guest',
  email: 'guest',
  token: '',
  loggedIn: false,
};

export function initializeFirebase() {
  firebase.initializeApp(firebaseConfig);
}

export function mapUser(firebaseUser: firebase.User, token: string): User {
  return firebaseUser
    ? {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        token,
        loggedIn: true,
      }
    : defaultUser;
}

type AuthUnsubscribe = () => void;
export function setAuthStateListener(onAuthStateChanged: (user: User) => void): AuthUnsubscribe {
  const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
    const token = user ? await user.getIdToken() : '';
    onAuthStateChanged(mapUser(user, token));
  });
  return unsubscribe;
}

export async function login(email: string, password: string): Promise<Error> {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
  return null;
}

export async function logout() {
  return firebase.auth().signOut();
}