import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View } from 'react-native';
import { StyledButton } from './StyledButton';

import { useSelector } from 'react-redux';
import { selectInfo } from '../redux/reducers/userSlice';

export const DownloadImage = ({
  onPressDownload,
  children,
  outerContainerStyles,
  outerButtonStyles,
}) => {
  const userInfo = useSelector(selectInfo);
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      quality: 0.3,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Selected Image URI:', uri);
      onPressDownload(uri);
    }
  };
  return (
    <View style={outerContainerStyles}>
      <StyledButton onPress={pickImage} buttonStyles={outerButtonStyles}>
        {children}
      </StyledButton>
    </View>
  );
};
