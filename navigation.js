import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './context/auth';
import ScreensNav from './components/nav/ScreensNav';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ScreensNav />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;
