import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Divider} from '@rneui/base';

export const Tab = ({icons, text, handlePress, screenName, routeName}) => {
  const activeScreenColor = screenName === routeName && 'orange';
  return (
    <TouchableOpacity onPress={handlePress}>
      <>
        <FontAwesome
          name={icons}
          size={25}
          style={{marginBottom: 3, alignSelf: 'center'}}
          color={activeScreenColor}
        />
        <Text>{text}</Text>
      </>
    </TouchableOpacity>
  );
};

export default FooterTabs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <>
      <Divider width={1} />
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          marginHorizontal: 30,
          justifyContent: 'space-between',
        }}>
        <Tab
          text="Home"
          icons="home"
          handlePress={() => navigation.navigate('Home')}
          screenName="Home"
          routeName={route.name}
        />
        <Tab
          text="Post"
          icons="plus-square"
          handlePress={() => navigation.navigate('Post')}
          screenName="Post"
          routeName={route.name}
        />
        <Tab
          text="Links"
          icons="list-ol"
          handlePress={() => navigation.navigate('Links')}
          screenName="Links"
          routeName={route.name}
        />
        <Tab
          text="Account"
          icons="user"
          handlePress={() => navigation.navigate('Account')}
          screenName="Account"
          routeName={route.name}
        />
      </View>
    </>
  );
};
