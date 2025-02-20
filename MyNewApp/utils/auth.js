import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config';
import { setUserInfo, clearUserInfo } from '../src/redux/reducers/userSlice';
import { addUser, getData, getUser, uploadImage } from './firestore';

export const registerUser = async ({ email, password, login }) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credentials.user;

    await addUser(user.uid, {
      uid: user.uid,
      email: user.email || '',
      displayName: login || '',
    });
  } catch (error) {
    console.log('Signup error:', error);
  }
};

export const loginUser = async ({ email, password }, dispatch) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    console.log(credentials);
    const user = credentials.user;

    dispatch(
      setUserInfo({
        uid: user.uid,
        email: user?.email || '',
        displayName: user?.displayName || '',
        profilePhoto: user?.photoURL || '',
      })
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (dispatch) => {
  try {
    await signOut(auth);

    dispatch(clearUserInfo());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const authStateChanged = (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUser(user.uid);

      dispatch(
        setUserInfo({
          ...userData,
          uid: user.uid,
          email: user.email || '',
        })
      );
    } else {
      dispatch(clearUserInfo());
    }
  });
};

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
