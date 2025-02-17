import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
  where,
  query,
  arrayUnion,
  deleteDoc,
} from 'firebase/firestore';
import { db, storage } from '../config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), userData, { merge: true });
    console.log('User added:', userId);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const addPostService = async (post) => {
  try {
    const postRef = await addDoc(collection(db, 'posts'), {
      ...post,
    });

    const postImage = await uploadImage(
      post.userID,
      post.image,
      postRef.id,
      'postsPhotos'
    );

    await updateDoc(postRef, {
      image: postImage,
      id: postRef.id,
    });

    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      const post = docSnap.data();

      return post;
    } else {
      throw new Error('Error adding post');
    }
  } catch (error) {
    console.error('Error adding post:', error);
  }
};

export const getAllPostsService = async (userId) => {
  try {
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => doc.data());

    return data;
  } catch (error) {
    console.error('Error getting posts:', error);
  }
};

export const addCommentService = async (postId, data) => {
  try {
    const postRef = doc(db, 'posts', postId);

    await updateDoc(postRef, {
      comments: arrayUnion({ ...data }),
    });

    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      const post = docSnap.data();

      return post;
    } else {
      throw new Error('Error adding comments');
    }
  } catch (error) {
    console.log('Error in add comment', error.message);
  }
};

export const getData = async (userId, collection = 'users') => {
  const docRef = doc(db, collection, userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (collection === 'users') return docSnap.data();
    const data = docSnap.data().posts;
    return data;
  } else {
    console.log('No such document!');
    return null;
  }
};

// export const uploadImage = async (
//   userId,
//   uri,
//   fileName,
//   path = 'profilePhotos'
// ) => {
//   const response = await fetch(uri);
//   const file = await response.blob();
//   const fileNameFromUri = uri.split('/').pop();
//   const fileType = file.type;
//   const imageFile = new File([file], fileNameFromUri, { type: fileType });

//   try {
//     const imageRef = ref(
//       storage,
//       `${path}/${userId}/${fileName.toLowerCase()}`
//     );

//     await uploadBytes(imageRef, imageFile);

//     const imageUrl = await getImageUrl(imageRef);
//     console.log('Upload image done');
//     return imageUrl;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error;
//   }
// };

export const uploadImage = async (
  userId,
  uri,
  fileName,
  path = 'profilePhotos'
) => {
  try {
    // Fetch the file from the URI
    const response = await fetch(uri);
    const fileBlob = await response.blob();
    // Optionally, if you need metadata:
    const metadata = {
      contentType: fileBlob.type,
    };

    // Create a reference to the storage location
    const imageRef = ref(
      storage,
      `${path}/${userId}/${fileName.toLowerCase()}`
    );

    // Upload the blob (you can pass metadata as the third argument)
    await uploadBytes(imageRef, fileBlob, metadata);

    const imageUrl = await getDownloadURL(imageRef);
    console.log('Upload image done');
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getImageUrl = async (imageRef) => {
  const url = await getDownloadURL(imageRef);
  return url;
};
export const deleteImage = async (uid) => {
  try {
    await deleteDoc(doc(db, 'profilePhotos', uid));
    console.log('Document successfully deleted!');
  } catch (error) {
    console.log('Error deleting image', error);
  }
};
