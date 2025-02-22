import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../styles/globalStyles';
import { Message } from '../../icons/Message';
import { ThumbUp } from '../../icons/ThumbUp';
import { MapMarkerGray } from '../../icons/MapMarkerGray';
import { useNavigation } from '@react-navigation/native';
import { StyledButton } from '../Components/StyledButton';

export const Post = ({ post }) => {
  const navigation = useNavigation();

  const onCommentsPress = () =>
    navigation.navigate('Comments', {
      postId: post.id,
    });
  const onLocationPress = () => navigation.navigate('Map', { postId: post.id });

  const location = post.location.at(0).toUpperCase() + post.location.slice(1);

  const ImageWrapper = ({ uri }) => {
    return (
      <View style={styles.imageWrapper}>
        <Image
          source={!!uri ? { uri } : require('../../images/Post1.jpg')}
          style={styles.image}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ImageWrapper uri={post.image} />

      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoThumb}>
          <StyledButton buttonStyles={styles.button} onPress={onCommentsPress}>
            <View style={styles.infoWrapper}>
              <Message
                color={
                  post.comments.length === 0 ? colors.dark_gray : colors.orange
                }
                filled={post.comments.length !== 0}
              />
              <Text
                style={[
                  styles.comments,
                  post.info === 0 && styles.infoNonActive,
                ]}
              >
                {post.comments.length}
              </Text>
            </View>
          </StyledButton>

          {post.likes !== undefined && (
            <View style={styles.infoWrapper}>
              <ThumbUp
                color={post.likes === 0 ? colors.dark_gray : colors.orange}
              />
              <Text
                style={[styles.likes, post.info === 0 && styles.infoNonActive]}
              >
                {post.likes}
              </Text>
            </View>
          )}
        </View>

        <StyledButton buttonStyles={styles.button} onPress={onLocationPress}>
          <View style={styles.infoWrapper}>
            <MapMarkerGray color={colors.dark_gray} />
            <Text
              style={[styles.comments, post.info === 0 && styles.infoNonActive]}
            >
              {location}
            </Text>
          </View>
        </StyledButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    gap: 8,
    paddingVertical: 16,
  },

  title: {
    color: colors.black,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: 500,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoThumb: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 24,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  info: {
    color: colors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
  },
  infoNonActive: {
    color: colors.dark_gray,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
