import React, {useContext} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {AuthContext} from '../context/auth';
import FooterTabs from '../components/nav/FooterTabs';

const Home = () => {
  const [state, setState] = useContext(AuthContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

export default Home;
