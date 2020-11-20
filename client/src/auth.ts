import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from './models';

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

export function initializeFirebase() {
  firebase.initializeApp(firebaseConfig);
}

export const noUser: User = {
  id: 'guest',
  email: 'guest',
  token: '',
  loggedIn: false,
};

type AuthUnsubscribe = () => void;
export function setAuthStateListener(
  onAuthStateChanged: (user: User) => void,
  autoLogin = true
): AuthUnsubscribe {
  return firebase.auth().onAuthStateChanged(async firebaseUser => {
    const token = firebaseUser ? await firebaseUser.getIdToken() : '';
    const user = mapUser(firebaseUser, token);
    user.loggedIn = autoLogin;
    onAuthStateChanged(user);
  });
}

export function mapUser(firebaseUser: firebase.User | null, token: string): User {
  return firebaseUser
    ? {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        token,
        loggedIn: false,
      }
    : noUser;
}

export async function login(email: string, password: string): Promise<Error | null> {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
  return null;
}

export function logout() {
  return firebase.auth().signOut();
}

export function userIsNone(user: User) {
  return user.email === noUser.email && user.id === noUser.id && user.token == noUser.token;
}

export async function getCurrentUser() {
  const user = firebase.auth().currentUser;
  const token = user ? await user.getIdToken() : '';
  return mapUser(user, token);
}
