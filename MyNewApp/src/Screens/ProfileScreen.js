import { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../styles/globalStyles';
import { Post } from '../Components/Post';
import { LogoutButton } from '../Components/LogoutButton';
import { selectInfo, setUserInfo } from '../redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts } from '../redux/reducers/postsSlice';
import { fetchPosts } from '../redux/reducers/operation';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteImage, uploadImage } from '../../utils/firestore';
import { updateCurrentUser } from 'firebase/auth';
import { Avatar } from '../Components/Avatar';
import { logoutUser } from '../../utils/auth';
const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export const ProfileScreen = () => {
  const user = useSelector(selectInfo);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(user.uid));
  }, [dispatch]);

  const onPressChangeAvatar = async (uri) => {
    await deleteImage(user.uid);
    const newPhotoUrl = await uploadImage(user.uid, uri, 'avatar');
    await updateCurrentUser({ photo: newPhotoUrl });

    dispatch(setUserInfo({ ...user, photo: newPhotoUrl }));
  };

  const onPressLogout = () => {
    logoutUser(dispatch);
  };

  //   try {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();

  //     if (status !== 'granted') {
  //       alert('Need permission to access gallery');
  //       return;
  //     }

  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: 'images',
  //       allowsEditing: false,
  //       quality: 1,
  //     });
  //     dispatch(setUserInfo({ ...user, photo: newPhotoUrl }));

  //     if (!result.canceled) {
  //       setPhoto(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     console.log('Error while downloading photo', error);
  //     alert('Error while downloading photo');
  //   }
  // };

  // const handlePhotoRemove = () => {
  //   setPhoto('');
  // };

  // const testPosts = [
  //   {
  //     image: require('../../images/Post1.jpg'),
  //     title: 'Захід на Чорному морі',
  //     location: 'Odessa Region, Ukraine',
  //   },
  //   {
  //     image: require('../../images/Post2.jpg'),
  //     title: 'Старий будиночок у Венеції',
  //     location: 'Venice, Italy',
  //   },
  //   {
  //     image: require('../../images/Post3.jpg'),
  //     title: 'Ліс',
  //     location: "Ivano-Frankivs'k Region, Ukraine",
  //   },
  //   {
  //     image: require('../../images/Post1.jpg'),
  //     title: 'Захід на Чорному морі',
  //     location: 'Odessa Region, Ukraine',
  //   },
  // ];

  return (
    <ScrollView>
      {user && (
        <View style={styles.container}>
          <Image
            source={require('../../images/PhotoBG.jpg')}
            resizeMode="cover"
            style={styles.image}
          />

          <View style={styles.container}>
            <View style={styles.formContainer}>
              <LogoutButton
                style={styles.logoutButton}
                onPress={onPressLogout}
              />

              <Avatar
                photo={user.photo}
                onPressChangeAvatar={onPressChangeAvatar}
              />

              <Text style={styles.title}>{user.login}</Text>

              {/* Posts */}

              <View>
                {posts.map((post) => (
                  <Post post={post} key={post.id} />
                ))}
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  // innerContainer: {
  //   gap: 16,
  // },
  // inputContainer: {
  //   marginTop: 32,
  // },
  // buttonContainer: {
  //   marginTop: 42,
  // },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
  },
  formContainer: {
    width: SCREEN_WIDTH,
    height: '67.61%',
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 79,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 36,
    textAlign: 'center',
  },
  // baseText: {
  //   fontWeight: '400',
  //   fontSize: 16,
  //   lineHeight: 18,
  // },
  // loginButtonText: {
  //   color: colors.white,
  //   textAlign: 'center',
  // },
  // passwordButtonText: {
  //   color: colors.blue,
  // },
  // passwordButton: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // signUpContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // signUpText: {
  //   textDecorationLine: 'underline',
  // },
  photoContainer: {
    position: 'absolute',
    top: -60,
    bottom: 0,
    height: 120,
    width: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
    alignSelf: 'center',
  },
  // circlePlus: {
  //   position: 'absolute',
  //   right: -12,
  //   bottom: 12,
  //   paddingVertical: 0,
  //   backgroundColor: 'transparent',
  // },
  photo: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  postsContainer: {
    paddingTop: 32,
    paddingBottom: 16,
  },
  logoutButton: {
    position: 'absolute',
    right: 16,
    top: 22,
  },
});
