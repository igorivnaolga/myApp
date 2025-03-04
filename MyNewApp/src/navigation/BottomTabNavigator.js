import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PostsIcon } from '../../icons/PostsIcon';
import { UserIcon } from '../../icons/UserIcon';
import { WideCirclePlus } from '../../icons/WideCirclePlus';
import { ArrowLeft } from '../../icons/ArrowLeft';

import { ProfileScreen } from '../Screens/ProfileScreen';
import { CreatePostsScreen } from '../Screens/CreatePostsScreen';
import { LogoutButton } from '../Components/LogoutButton';
import { PostsScreen } from '../Screens/PostsScreen';
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/globalStyles';
import { logoutUser } from '../../utils/auth';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ navigation }) => ({
        tabBarLabel: 'label',
        tabBarStyle: {
          display: 'flex',
          height: 83,
          paddingVertical: 16,
          justifyContent: 'space-between',
          paddingHorizontal: 31,
        },
        tabBarItemStyle: {
          marginHorizontal: 15.5,
          marginTop: 9,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: 'Публікації',
          headerRight: () => (
            <LogoutButton
              style={{ paddingRight: 10 }}
              onPress={() => logoutUser(dispatch)}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <PostsIcon
              width={24}
              height={24}
              color={focused ? colors.orange : 'black'}
            />
          ),
        })}
      />

      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: 'Створити публікацію',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <WideCirclePlus
              width={70}
              height={40}
              color={focused ? colors.orange : 'black'}
            />
          ),
          headerLeft: () => (
            <ArrowLeft
              width={24}
              height={24}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          title: 'Profile',
          headerRightContainerStyle: { paddingRight: 8 },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <UserIcon
              width={24}
              height={24}
              color={focused ? colors.orange : 'black'}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
