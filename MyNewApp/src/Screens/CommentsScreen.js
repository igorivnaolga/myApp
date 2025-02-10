import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { colors } from '../../styles/globalStyles';
import { Comment } from '../Components/Comment';
import { Input } from '../Components/Input';
import { SendIcon } from '../../icons/SendIcon';

export const CommentsScreen = ({ route }) => {
  const post = route?.params?.post;

  const testComments = [
    {
      text: "Absolutely breathtaking! The way the sunlight dances through the trees creates such a serene and magical atmosphere. I feel like I'm right there in nature's embrace.",
      date: '09 January, 2020 | 09:40',
      avatar: require('../../images/avatar.jpg'),
    },
    {
      text: "This photo captures nature's beauty perfectly — the vibrant colors, the peaceful landscape, and the gentle flow of the scenery all come together to create a stunning masterpiece.",
      date: '09 January, 2025 | 10:22',
      avatar: require('../../images/avatar.jpg'),
      align: 'right',
    },
  ];

  const SendBtn = () => (
    <TouchableOpacity style={styles.sendBtn}>
      <SendIcon />
    </TouchableOpacity>
  );

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="height"
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image source={{ uri: post.image }} style={styles.image} />
            <View style={styles.commentsContainer}>
              <FlatList
                style={styles.commentsList}
                data={testComments}
                renderItem={({ item }) => (
                  <Comment
                    text={item.text}
                    date={item.date}
                    avatar={item.avatar}
                    align={item.align}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Input
              outerStyles={styles.input}
              placeholder="Коментувати..."
              rightButton={<SendBtn />}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 40,
    backgroundColor: colors.white,
  },
  innerContainer: {
    flex: 1,
  },
  commentsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    marginTop: 32,
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.gray,
    padding: 16,
    paddingRight: 42,
  },
  sendBtn: {
    height: 34,
    width: 34,
    borderRadius: 100,
    position: 'absolute',
    right: 4,
    bottom: 8,
  },
  commentsList: {
    width: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});
