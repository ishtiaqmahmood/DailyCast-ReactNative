import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const Links = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Links Screen</Text>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

export default Links;
