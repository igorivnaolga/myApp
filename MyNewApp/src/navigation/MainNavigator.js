import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/LoginScreen';
import { RegistrationScreen } from '../Screens/RegistrationScreen';
import { MapScreen } from '../Screens/MapScreen';
import { CommentsScreen } from '../Screens/CommentsScreen';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from '../../icons/ArrowLeft';
import CameraScreen from '../Screens/CameraScreen';
import { useSelector } from 'react-redux';
import { selectInfo } from '../redux/reducers/userSlice';
import { Home } from '../Screens/Home';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const navigation = useNavigation();
  const user = useSelector(selectInfo);
  console.log('Redux user state:', user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen
            name="MapScreen"
            options={{
              headerShown: true,
              headerTitle: 'Карта',
              headerLeft: () => (
                <ArrowLeft
                  width={24}
                  height={24}
                  style={{ marginLeft: 16 }}
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
            component={MapScreen}
          />
          <Stack.Screen
            name="CommentsScreen"
            options={{
              headerShown: true,
              headerTitle: 'Коментарі',
              headerLeft: () => (
                <ArrowLeft
                  width={24}
                  height={24}
                  style={{ marginLeft: 16 }}
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
            component={CommentsScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
