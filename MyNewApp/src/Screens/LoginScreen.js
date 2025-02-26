import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { loginUser } from '../../utils/auth';
import { useNavigation } from '@react-navigation/native';
import { LOGIN_INITIAL_STATE } from '../constants/constants';

export const LoginScreen = () => {
  const [user, setUser] = useState(LOGIN_INITIAL_STATE);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onChangeUserData = (key, value) => {
    if (key === 'isPasswordHidden')
      return setUser((prev) => ({ ...prev, [key]: !user.isPasswordHidden }));

    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const onPressLogin = async () => {
    const { email, password } = user;

    await loginUser({ email, password }, dispatch);
  };

  const checkFormFilled = () => {
    if (user.email && user.password) {
      setUser((prev) => ({ ...prev, isFormFilled: true }));
    }
  };
  const onPressRegistration = () => {
    navigation.navigate('Registration');
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
            <View style={styles.formContainerLoginScreen}>
              <Text style={styles.title}>Увійти</Text>

              <View style={styles.formFields}>
                <TextInput
                  placeholder="Адреса електронної пошти"
                  style={styles.input}
                  value={user.email}
                  onChangeText={(text) => onChangeUserData('email', text)}
                  onBlurInput={checkFormFilled}
                />
                <View style={styles.passwordField}>
                  <TextInput
                    placeholder="Пароль"
                    style={styles.input}
                    secureTextEntry={user.isPasswordHidden}
                    value={user.password}
                    onChangeText={(text) => onChangeUserData('password', text)}
                    onBlur={checkFormFilled}
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
                onPress={onPressLogin}
                disabled={!user.isFormFilled}
              >
                <Text style={styles.mainActionButtonText}>Увійти</Text>
              </StyledButton>

              <View style={styles.secondaryActionContainer}>
                <Text style={styles.secondaryActionText}>Немає акаунту? </Text>
                <StyledButton
                  buttonStyles={styles.secondaryActionButton}
                  onPress={onPressRegistration}
                >
                  <Text style={styles.secondaryActionButtonText}>
                    Зареєструватися
                  </Text>
                </StyledButton>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
};

export const styles = StyleSheet.create({
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
    color: colors.blue,
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
