import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const Post = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Post Screen</Text>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

export default Post;
