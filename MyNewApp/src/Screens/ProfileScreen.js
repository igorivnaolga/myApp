import { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { colors } from '../../styles/globalStyles';
import { CirclePlusSvg } from '../../icons/CirclePlusSvg';
import { CircleCrossSvg } from '../../icons/CircleCrossSvg';
import { Post } from '../Components/Post';
import { LogoutButton } from '../Components/LogoutButton';
import { StyledButton } from '../Components/StyledButton';
const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export const ProfileScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState('');

  const handlePhotoUpload = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        alert('Need permission to access gallery');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error while downloading photo', error);
      alert('Error while downloading photo');
    }
  };

  const handlePhotoRemove = () => {
    setPhoto('');
  };

  const testPosts = [
    {
      image: require('../../images/Post1.jpg'),
      title: 'Захід на Чорному морі',
      location: 'Odessa Region, Ukraine',
    },
    {
      image: require('../../images/Post2.jpg'),
      title: 'Старий будиночок у Венеції',
      location: 'Venice, Italy',
    },
    {
      image: require('../../images/Post3.jpg'),
      title: 'Ліс',
      location: "Ivano-Frankivs'k Region, Ukraine",
    },
    {
      image: require('../../images/Post1.jpg'),
      title: 'Захід на Чорному морі',
      location: 'Odessa Region, Ukraine',
    },
  ];

  return (
    <>
      <Image
        source={require('../../images/PhotoBG.jpg')}
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.container}>
        <View style={styles.formContainer}>
          <LogoutButton
            style={styles.logoutButton}
            onPress={() => navigation.navigate('Login')}
          />

          <View style={styles.photoContainer}>
            {photo && (
              <>
                <Image source={{ uri: photo }} style={styles.photo} />
                <StyledButton
                  onPress={handlePhotoRemove}
                  buttonStyles={styles.circlePlus}
                >
                  <CircleCrossSvg />
                </StyledButton>
              </>
            )}

            {!photo && (
              <StyledButton
                onPress={handlePhotoUpload}
                buttonStyles={styles.circlePlus}
              >
                <CirclePlusSvg />
              </StyledButton>
            )}
          </View>

          <Text style={styles.title}>Natali Romanova</Text>

          {/* Posts */}
          <FlatList
            style={styles.postsContainer}
            data={testPosts}
            renderItem={({ item }) => (
              <Post
                image={item.image}
                title={item.title}
                location={item.location}
              />
            )}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
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
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 36,
    textAlign: 'center',
  },
  baseText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: 'center',
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    textDecorationLine: 'underline',
  },
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
  circlePlus: {
    position: 'absolute',
    right: -12,
    bottom: 12,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
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
