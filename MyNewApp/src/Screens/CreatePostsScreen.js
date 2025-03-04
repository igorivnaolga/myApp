import { FC, useEffect, useState, useRef } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { TrashCan } from '../../icons/TrashCan';
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { MapMarkerGray } from '../../icons/MapMarkerGray';

import { colors } from '../../styles/globalStyles';

import { StyledButton } from '../Components/StyledButton';
import { Input } from '../Components/Input';
import { addPost, uploadImage } from '../../utils/firestore';
import { POST_INITIAL_STATE } from '../constants/constants';
import { selectInfo } from '../redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DownloadImage } from '../Components/DownloadImage';
import Camera from '../Components/Camera';

const PLACES_KEY = 'AIzaSyA-uCvWguBzl0M97bS7rRUMikXj_YEJxts';

export const CreatePostsScreen = () => {
  const [post, setPost] = useState(POST_INITIAL_STATE);
  const [showCamera, setShowCamera] = useState(true);
  const user = useSelector(selectInfo);
  const dispatch = useDispatch();
  const autocompleteRef = useRef(null);

  const navigation = useNavigation();
  console.log('🔍 Navigation object:', navigation);
  const navigateToCameraScreen = async () => {
    navigation.navigate('Camera');
  };

  // const onChangePostData = (key, value) => {
  //   console.log(`Updating ${key} with value:`, value);
  //   setPost((prev) => ({ ...prev, [key]: value }));
  // };

  const onChangePostData = (key, value) => {
    if (key === 'image') {
      setPost((prev) => ({ ...prev, [key]: value, isEmptyPost: false }));

      return;
    }

    setPost((prev) => ({ ...prev, [key]: value }));
  };

  const checkForm = () => {
    if (post.image && post.title && post.location) {
      setPost((prev) => ({ ...prev, isEmptyPost: false }));
    }
  };

  const onClearData = () => {
    setPost(POST_INITIAL_STATE);
    setShowCamera(true);
  };

  const onPressPublicationButton = async () => {
    // Check if any required field is empty
    console.log('🟢 Button pressed, starting post...');
    console.log('🔍 Checking user before post:', user);
    console.log('📤 Posting data...');
    if (!user || !user.uid) {
      console.error('🚨 Error: User ID is missing');
      return;
    }
    if (!post.image.trim() || !post.title.trim()) {
      console.log('Post is incomplete.');
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const data = {
      ...post,
      coords: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      userId: user.uid,
    };
    console.log('🚀 Posting data:', data);
    dispatch(addPost(data));
    onClearData();
    navigation.navigate('PostsScreen');
  };

  const takePhoto = (imageURI) => {
    if (showCamera) {
      setShowCamera(false);
    }
    onChangePostData('image', imageURI);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.section}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.section}
        >
          <View style={styles.imageContainer}>
            <View style={styles.emptyImgContainer}>
              <Camera
                onPressTakePicture={takePhoto}
                image={post.image}
                showCamera={showCamera}
              />

              <DownloadImage
                onPressDownload={takePhoto}
                outerButtonStyles={styles.downloadButton}
              >
                <Text style={styles.imageText}>
                  {showCamera ? 'Завантажте фото' : 'Редагувати фото'}
                </Text>
              </DownloadImage>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <Input
                value={post.title}
                placeholder="Назва..."
                outerStyles={styles.input}
                onChange={(text) => onChangePostData('title', text)}
                onBlurInput={checkForm}
              />

              <View style={styles.locationInputContainer}>
                <MapMarkerGray
                  width={24}
                  height={24}
                  style={styles.mapMarker}
                />
                <GooglePlacesAutocomplete
                  ref={autocompleteRef}
                  placeholder="Місцевість..."
                  value={post.location}
                  minLength={4}
                  enablePoweredByContainer={false}
                  fetchDetails
                  onPress={(data, details = null) =>
                    onChangePostData('location', data)
                  }
                  query={{ key: PLACES_KEY }}
                  onBlur={checkForm}
                  styles={{
                    container: {
                      flex: 1,
                    },
                    textInputContainer: {
                      flexDirection: 'row',
                      paddingHorizontal: 0,
                    },
                    textInput: {
                      paddingVertical: 5,
                      paddingHorizontal: 28,
                      fontSize: 15,
                      flex: 1,
                      borderBottomWidth: 1,
                      borderColor: colors.border_gray,
                    },
                    row: {
                      backgroundColor: '#FFFFFF',
                      padding: 13,
                      height: 44,
                      flexDirection: 'row',
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                    listView: {
                      maxHeight: 160,
                    },
                  }}
                />
              </View>
            </KeyboardAvoidingView>

            <StyledButton
              onPress={onPressPublicationButton}
              buttonStyles={[
                styles.publicationButton,
                !post.isEmptyPost && styles.publicationButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.publicationText,
                  !post.isEmptyPost && styles.publicationTextActive,
                ]}
              >
                Опублікувати
              </Text>
            </StyledButton>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <StyledButton buttonStyles={styles.deleteBtn} onPress={onClearData}>
              <TrashCan width={24} height={24} />
            </StyledButton>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    gap: 32,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
    color: colors.white,
    textAlign: 'center',
  },
  publicationButton: {
    backgroundColor: colors.light_gray,
  },
  publicationButtonActive: {
    backgroundColor: colors.orange,
  },
  publicationText: {
    color: colors.dark_gray,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 19,
  },
  publicationTextActive: {
    color: colors.white,
  },

  grayText: {
    textAlign: 'left',
    color: colors.text_gray,
  },
  imageContainer: {
    gap: 8,
  },
  emptyImgContainer: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIconWrapper: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  input: {
    width: '100%',
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: colors.white,
    paddingLeft: 0,
  },
  deleteBtn: {
    display: 'flex',
    width: 70,
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light_gray,
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  cameraContent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  mapMarker: {
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 1000,
  },
  downloadButton: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  imageText: {
    color: colors.dark_gray,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
  },
});
