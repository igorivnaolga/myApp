import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../styles/globalStyles';
import { Post } from '../Components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { selectInfo } from '../redux/reducers/userSlice';
import { selectPosts } from '../redux/reducers/postsSlice';
import { fetchPosts } from '../redux/reducers/operation';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export const PostsScreen = () => {
  const user = useSelector(selectInfo);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const prepareData = (data) => {
    if (!data || data.length === 0) return [];
    return data.map((el) => {
      const { likes, ...data } = el;
      return data;
    });
  };

  const preparedPosts = prepareData(posts);

  useEffect(() => {
    dispatch(fetchPosts(user.uid));
  }, [dispatch]);

  return (
    <ScrollView>
      {user && (
        <View style={styles.container}>
          <View style={styles.userContainer}>
            <Image
              source={
                !!user.photo
                  ? { uri: user.photo }
                  : require('../../images/avatar.jpg')
              }
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.displayName}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.postsWrapper}>
            {preparedPosts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    lineHeight: 15,
    color: colors.black_primary,
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
});
