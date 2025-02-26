import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/globalStyles';
import { StyledButton } from '../Components/StyledButton';
import { registerUser } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { REGISTER_INITIAL_STATE } from '../constants/constants';
import { Avatar } from '../Components/Avatar';
import { useNavigation } from '@react-navigation/native';

export const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user, setUser] = useState(REGISTER_INITIAL_STATE);

  useEffect(() => {
    checkFormFilled();
  }, [user.email, user.password, user.login, user.photo]);
  // useEffect(() => {
  //   setUser((prev) => ({
  //     ...prev,
  //     isFormFilled: Boolean(
  //       prev.email && prev.password && prev.login && prev.photo
  //     ),
  //   }));
  // }, [user.email, user.password, user.login, user.photo]);

  const onChangeUserData = (key, value) => {
    if (key === 'isPasswordHidden')
      return setUser((prev) => ({ ...prev, [key]: !user.isPasswordHidden }));

    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const onPressRegistration = async () => {
    if (!user.isFormFilled) {
      console.log('❌ Registration blocked: Form is not filled.');
      return;
    }

    console.log('🚀 Starting registration with:', user);

    const { email, password, login, photo } = user;

    try {
      const response = await registerUser(
        { email, password, login, photo },
        dispatch
      );
      console.log('✅ Registration successful:', response);
    } catch (error) {
      console.error('❌ Registration failed:', error);
    }
  };

  const onPressLogin = () => {
    navigation.navigate('Login');
  };

  const onPressChangeAvatar = (uri) => {
    console.log('Updating avatar with URI:', uri);
    onChangeUserData('photo', uri);
  };

  const checkFormFilled = () => {
    setUser((prev) => ({
      ...prev,
      isFormFilled: Boolean(
        prev.email && prev.password && prev.login && prev.photo
      ),
    }));
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../../images/PhotoBG.jpg')}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.formContainer}>
              <Avatar
                photo={user.photo}
                onPressChangeAvatar={onPressChangeAvatar}
              />

              <Text style={styles.title}>Реєстрація</Text>

              <View style={styles.formFields}>
                <TextInput
                  placeholder="Логін"
                  style={styles.input}
                  value={user.login}
                  onChangeText={(text) => onChangeUserData('login', text)}
                />
                <TextInput
                  placeholder="Адреса електронної пошти"
                  style={styles.input}
                  value={user.email}
                  onChangeText={(text) => onChangeUserData('email', text)}
                  onBlur={checkFormFilled}
                />
                <View style={styles.passwordField}>
                  <TextInput
                    placeholder="Пароль"
                    style={styles.input}
                    secureTextEntry={user.isPasswordHidden}
                    outerStyles={styles.passwordInput}
                    value={user.password}
                    onBlur={checkFormFilled}
                    onChangeText={(text) => onChangeUserData('password', text)}
                  />
                  <StyledButton
                    onPress={() => onChangeUserData('isPasswordHidden')}
                    buttonStyles={styles.passwordButton}
                  >
                    <Text style={styles.passwordButtonText}>
                      {user.isPasswordHidden ? 'Показати' : 'Приховати'}
                    </Text>
                  </StyledButton>
                </View>
              </View>

              <StyledButton
                buttonStyles={styles.mainActionButton}
                onPress={onPressRegistration}
                disabled={!user.isFormFilled}
              >
                <Text style={styles.mainActionButtonText}>Зареєструватися</Text>
              </StyledButton>

              <View style={styles.secondaryActionContainer}>
                <Text style={styles.secondaryActionText}>Вже є акаунт? </Text>
                <StyledButton
                  buttonStyles={styles.secondaryActionButton}
                  onPress={onPressLogin}
                >
                  <Text style={styles.secondaryActionButtonText}>Увійти</Text>
                </StyledButton>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    bottom: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 100,
  },

  formContainer: {
    width: '100%',
    // height: '55%',
    paddingTop: 92,
    paddingBottom: 80,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
  },
  formContainerLoginScreen: {
    width: '100%',
    paddingTop: 32,
    paddingBottom: 80,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
  },

  title: {
    marginBottom: 32,
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.3,
  },

  avatar: {
    position: 'absolute',
    alignSelf: 'center',
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
  },
  avatarButton: {
    position: 'absolute',
    right: -12,
    bottom: 12,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },

  formFields: {
    gap: 16,
    marginBottom: 43,
  },
  input: {
    backgroundColor: colors.light_gray,
    borderColor: colors.border_gray,
    borderRadius: 8,
    height: 50,
    paddingLeft: 16,
  },

  passwordField: {
    justifyContent: 'center',
  },

  passwordButton: {
    position: 'absolute',
    right: 16,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },

  passwordButtonText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
  },

  mainActionButton: {
    marginBottom: 16,
  },
  mainActionButtonText: {
    color: colors.white,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
  },

  secondaryActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryActionButton: {
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  secondaryActionText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
  },
  secondaryActionButtonText: {
    color: colors.blue,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
  },
  addButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
