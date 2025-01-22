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
import { CirclePlusSvg } from '../../icons/CirclePlusSvg';
import { StyledButton } from '../Components/StyledButton';

export const RegistrationScreen = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onPressRegistration = () => {
    console.log(`Login: ${login}\nEmail:${email}\nPassword:${password}`);
  };

  const onPressLogin = () => {
    console.log('Login pressed');
  };

  const onPressChangeAvatar = () => {
    console.log('Change avatar pressed');
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
              <View style={styles.avatar}>
                <StyledButton
                  buttonStyles={styles.avatarButton}
                  onPress={onPressChangeAvatar}
                >
                  <CirclePlusSvg />
                </StyledButton>
              </View>

              <Text style={styles.title}>Реєстрація</Text>

              <View style={styles.formFields}>
                <TextInput
                  placeholder="Логін"
                  style={styles.input}
                  value={login}
                  onChangeText={setLogin}
                />
                <TextInput
                  placeholder="Адреса електронної пошти"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
                <View style={styles.passwordField}>
                  <TextInput
                    placeholder="Пароль"
                    style={styles.input}
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
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
                buttonStyles={styles.registerButton}
                onPress={onPressRegistration}
              >
                <Text style={styles.registerButtonText}>Зареєструватися</Text>
              </StyledButton>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Вже є акаунт? </Text>
                <StyledButton
                  buttonStyles={styles.loginButton}
                  onPress={onPressLogin}
                >
                  <Text style={styles.loginButtonText}>Увійти</Text>
                </StyledButton>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
};
