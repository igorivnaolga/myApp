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

export const LoginScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    if (value.length < 20) {
      setPassword(value);
    }
  };

  const onPressLogin = async () => {
    console.log('onLogin');

    try {
      await loginUser({ email, password }, dispatch);
    } catch (error) {
      Alert.alert('error');
      console.error('Login error:', error);
    }
  };

  const checkFormFilled = () => {
    if (user.email && user.password) {
      setUser((prev) => ({ ...prev, isFormFilled: true }));
    }
  };

  const onPressRegistration = () => {
    console.log('Registration pressed');
    navigation.navigate('Registration', { email, password });
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
                  value={email}
                  onChangeText={handleEmailChange}
                  onBlurInput={checkFormFilled}
                />
                <View style={styles.passwordField}>
                  <TextInput
                    placeholder="Пароль"
                    style={styles.input}
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={handlePasswordChange}
                    onBlurInput={checkFormFilled}
                  />
                  <StyledButton
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    buttonStyles={styles.passwordButton}
                  >
                    <Text style={styles.passwordButtonText}>
                      {isPasswordVisible ? 'Приховати' : 'Показати'}
                    </Text>
                  </StyledButton>
                </View>
              </View>

              <StyledButton
                buttonStyles={styles.mainActionButton}
                onPress={onPressLogin}
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
