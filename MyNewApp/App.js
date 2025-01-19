import { Image, View, StatusBar } from 'react-native';
import { styles } from './styles';
import { RegistrationScreen } from './Screens/RegistrationScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image
          source={require('./images/PhotoBG.jpg')}
          resizeMode="cover"
          style={styles.image}
        />
        <StatusBar barStyle="dark-content" />
        <RegistrationScreen />
      </View>
    </SafeAreaProvider>
  );
}
