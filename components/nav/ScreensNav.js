import React, {useContext} from 'react';
import Signup from '../../screens/Signup';
import Signin from '../../screens/Signin';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../../context/auth';
import Home from '../../screens/Home';
import HeaderTabs from './HeaderTabs';
import Account from '../../screens/Account';
import Post from '../../screens/Post';
import Links from '../../screens/Links';

const Stack = createNativeStackNavigator();

const ScreensNav = () => {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== '' && state.user !== null;

  return (
    <Stack.Navigator
      initialRouteName="Signin"
      //screenOptions={{headerShown: false}}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'DailyCast',
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="Links"
            component={Links}
            options={{
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: 'Back',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreensNav;
