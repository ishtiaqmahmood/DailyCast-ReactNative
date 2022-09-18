import React, {useState, useContext} from 'react';
import {Text, View, ScrollView} from 'react-native';
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/auth';

const Signin = ({navigation}) => {
  const [email, setEmail] = useState('gatlinghutch@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);
  // context
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert('All fields are required');
      setLoading(false);
      return;
    }
    try {
      const {data} = await axios.post(`/signin`, {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save in context
        setState(data);
        // save response in async storage
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        setLoading(false);
        console.log('Sign In success =>>', data);
        alert('Sign In successful');
        // redirect
        navigation.navigate('Home');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <View>
        <CircleLogo />
        <Text style={{textAlign: 'center', fontSize: 30, marginBottom: 16}}>
          Sign In
        </Text>

        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
        <SubmitButton
          title="Sign In"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text style={{textAlign: 'center'}}>
          No Account?{' '}
          <Text
            style={{color: '#ff2222'}}
            onPress={() => navigation.navigate('Signup')}>
            Sign Up
          </Text>
        </Text>
        <Text style={{textAlign: 'center', marginTop: 10, color: 'orange'}}>
          Forgot password?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signin;
