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
import { styles } from '../../styles/styles';
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
