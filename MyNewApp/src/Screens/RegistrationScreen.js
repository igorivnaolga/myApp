import React, { useEffect, useState } from 'react';
import {
  Image,
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
import { CircleCrossSvg } from '../../icons/CircleCrossSvg';
import { StyledButton } from '../Components/StyledButton';
import * as ImagePicker from 'expo-image-picker';
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

// const handlePhotoUpload = async () => {
//   try {
//     const { status } =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (status !== 'granted') {
//       alert('Permission to access media library is required!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: 'images',
//       allowsEditing: false,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setPhoto(result.assets[0].uri);
//     }
//   } catch (error) {
//     console.log('Error while downloading photo', error);
//     alert('Error while downloading photo');
//   }
// };

// const handlePhotoRemove = () => {
//   setPhoto('');
// };

// const handleLoginChange = (value) => {
//   setLogin(value);
// };

// const handleEmailChange = (value) => {
//   setEmail(value);
// };

// const handlePasswordChange = (value) => {
//   if (value.length < 20) {
//     setPassword(value);
//   }
// };

// const onPressRegistration = async () => {
//   console.log('Sign up!');
//   registerUser({ email, password });
// };

// const onPressLogin = () => {
//   console.log('Login pressed');
//   navigation.navigate('Login');
// };
