import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/styles';
import { CirclePlusSvg } from '../../icons/CirclePlusSvg';

export const RegistrationScreen = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../../images/PhotoBG.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}>
            <TouchableOpacity style={styles.addIcon}>
              <CirclePlusSvg />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Реєстрація</Text>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Логін"
          value={login}
          onChangeText={setLogin}
        />
        <TextInput
          style={styles.input}
          placeholder="Адреса електронної пошти"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Пароль"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text style={styles.showPasswordText}>
              {isPasswordVisible ? 'Приховати' : 'Показати'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Зареєструватися</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginLink}>Вже є акаунт? Увійти</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};
