import React, { useState } from 'react';
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

export const RegistrationScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePhotoUpload = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error while downloading photo', error);
      alert('Error while downloading photo');
    }
  };

  const handlePhotoRemove = () => {
    setPhoto('');
  };

  const handleLoginChange = (value) => {
    setLogin(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    if (value.length < 20) {
      setPassword(value);
    }
  };

  const onPressRegistration = () => {
    console.log(
      `Registration with Login: ${login}\nEmail:${email}\nPassword:${password}`
    );
    navigation.navigate('Home');
  };

  const onPressLogin = () => {
    console.log('Login pressed');
    navigation.navigate('Login');
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
                {photo ? (
                  <>
                    <Image source={{ uri: photo }} style={styles.photo} />
                    <StyledButton
                      buttonStyles={styles.avatarButton}
                      onPress={handlePhotoRemove}
                    >
                      <CircleCrossSvg />
                    </StyledButton>
                  </>
                ) : (
                  <StyledButton
                    onPress={handlePhotoUpload}
                    buttonStyles={styles.avatarButton}
                  >
                    <CirclePlusSvg />
                  </StyledButton>
                )}
              </View>

              <Text style={styles.title}>Реєстрація</Text>

              <View style={styles.formFields}>
                <TextInput
                  placeholder="Логін"
                  style={styles.input}
                  value={login}
                  onChangeText={handleLoginChange}
                />
                <TextInput
                  placeholder="Адреса електронної пошти"
                  style={styles.input}
                  value={email}
                  onChangeText={handleEmailChange}
                />
                <View style={styles.passwordField}>
                  <TextInput
                    placeholder="Пароль"
                    style={styles.input}
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={handlePasswordChange}
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
                onPress={onPressRegistration}
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
