import React from 'react';
import {View, Image, Text} from 'react-native';

const CircleLogo = ({children}) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 20,
    }}>
    <View
      style={{
        backgroundColor: '#fff',
        height: 190,
        width: 190,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {children ? (
        children
      ) : (
        <Image
          source={require('../../assets/DailyLinks.jpeg')}
          style={{
            width: 190,
            height: 190,
            marginVertical: 20,
            borderRadius: 100,
          }}
        />
      )}
    </View>
  </View>
);

export default CircleLogo;
