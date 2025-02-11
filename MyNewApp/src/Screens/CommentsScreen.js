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
      text: "Really love your most recent photo. I've been trying to capture the same thing for a few months and would love some tips!",
      date: '09 червня, 2020 | 08:40',
      avatar: require('../../images/avatar.jpg'),
    },
    {
      text: "A fast 50mm like f1.8 would help with the bokeh. I've been using primes as they tend to get a bit sharper images.",
      date: '09 червня, 2020 | 09:14',
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
            <Image
              source={{
                uri: post.image || 'https://example.com/default-image.jpg',
              }}
              style={styles.image}
            />
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
