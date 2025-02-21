import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRef } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import { StyledButton } from './StyledButton';
import { colors } from '../../styles/globalStyles';
import { CameraIcon } from '../../icons/CameraIcon';

export const Camera = ({ image = null, onPressTakePicture, showCamera }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] =
    MediaLibrary.usePermissions();

  const camera = useRef();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  if (!libraryPermission.granted) {
    requestLibraryPermission();
  }

  const takePhoto = async () => {
    if (!camera) return;

    if (!libraryPermission.granted) {
      requestLibraryPermission();
    }
    const image = await camera?.current?.takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(image.uri);

    onPressTakePicture(image.uri);
  };

  return (
    <>
      <View style={styles.imageThumb}>
        {showCamera ? (
          <CameraView ref={camera} style={styles.thumb}>
            <StyledButton
              onPress={takePhoto}
              buttonStyles={styles.cameraWrapper}
            >
              <CameraIcon color={colors.dark_gray} />
            </StyledButton>
          </CameraView>
        ) : (
          <View style={styles.thumb}>
            <Image source={{ uri: image }} style={styles.image} />
            <StyledButton
              onPress={takePhoto}
              buttonStyles={styles.cameraWrapperActive}
            >
              <CameraIcon color={colors.white} />
            </StyledButton>
          </View>
        )}
      </View>
    </>
  );
};

export default Camera;

const styles = StyleSheet.create({
  thumb: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cameraWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
  },
  cameraWrapperActive: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.bg_white,
    position: 'absolute',
  },

  imageThumb: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 240,
    backgroundColor: colors.gray,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
