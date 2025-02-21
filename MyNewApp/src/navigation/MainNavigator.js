import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/LoginScreen';
import { RegistrationScreen } from '../Screens/RegistrationScreen';
import { MapScreen } from '../Screens/MapScreen';
import { CommentsScreen } from '../Screens/CommentsScreen';
import { ArrowLeft } from '../../icons/ArrowLeft';
import { CameraScreen } from '../Screens/CameraScreen';
import { useSelector } from 'react-redux';
import { selectInfo } from '../redux/reducers/userSlice';
import { BottomTabNavigator } from '../navigation/BottomTabNavigator';
import { colors } from '../../styles/globalStyles';
import { CreatePostsScreen } from '../Screens/CreatePostsScreen';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const user = useSelector(selectInfo);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, backgroundColor: colors.white }}
    >
      {user ? (
        <>
          <Stack.Screen name="Home" component={BottomTabNavigator} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={({ navigation }) => ({
              title: 'Карта',
              headerShown: true,
              headerTintColor: colors.black,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'Roboto-Medium',
                fontSize: 17,
                fontWeight: 500,
              },
              headerLeft: () => (
                <StyledButton
                  onPress={() => navigation.goBack()}
                  buttonStyles={{
                    marginLeft: 16,
                    backgroundColor: 'transparent',
                  }}
                >
                  <ArrowLeft />
                </StyledButton>
              ),
            })}
          />
          <Stack.Screen
            name="CreatePostsScreen"
            component={CreatePostsScreen}
          />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerTintColor: colors.black,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'Roboto-Medium',
                fontSize: 17,
                fontWeight: 500,
              },
              headerLeft: () => (
                <StyledButton
                  onPress={() => navigation.goBack()}
                  buttonStyles={{
                    marginLeft: 16,
                    backgroundColor: 'transparent',
                  }}
                >
                  <ArrowLeft />
                </StyledButton>
              ),
            })}
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
