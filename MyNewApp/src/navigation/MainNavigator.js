import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/LoginScreen';
import { RegistrationScreen } from '../Screens/RegistrationScreen';
import { MapScreen } from '../Screens/MapScreen';
import { CommentsScreen } from '../Screens/CommentsScreen';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigator } from '../navigation/BottomTabNavigator';
import { ArrowLeft } from '../../icons/ArrowLeft';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Registration"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
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
    </Stack.Navigator>
  );
};
