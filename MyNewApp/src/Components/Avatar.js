import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CirclePlusSvg } from '../../icons/CirclePlusSvg';
import { CircleCrossSvg } from '../../icons/CircleCrossSvg';
import { colors } from '../../styles/globalStyles';
import { DownloadImage } from './DownloadImage';

export const Avatar = ({ photo, onPressChangeAvatar }) => {
  return (
    <View style={styles.avatar}>
      {!!photo && (
        <Image source={{ uri: photo }} style={styles.avatarImage}></Image>
      )}

      <DownloadImage
        onPressDownload={onPressChangeAvatar}
        outerContainerStyles={styles.avatarContainer}
        outerButtonStyles={styles.avatarButton}
      >
        {!photo ? <CirclePlusSvg /> : <CircleCrossSvg />}
      </DownloadImage>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    position: 'absolute',
    alignSelf: 'center',
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
  },
  avatarImage: {
    borderRadius: 16,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  avatarContainer: {
    position: 'absolute',
    right: -12,
    bottom: 12,
  },
  avatarButton: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
});
