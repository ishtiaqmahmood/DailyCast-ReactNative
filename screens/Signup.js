import React, {useState, useContext} from 'react';
import {Text, View, ScrollView} from 'react-native';
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/auth';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert('All fields are required');
      setLoading(false);
      return;
    }
    try {
      const {data} = await axios.post(`/signup`, {
        name,
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save to context
        setState(data);
        // save response in async storage
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        setLoading(false);
        console.log('Sign Up success =>>', data);
        alert('Sign up successful');
        // redirect
        navigation.navigate('Signin');
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
        marginBottom: 16,
      }}>
      <View>
        <CircleLogo />
        <Text style={{textAlign: 'center', fontSize: 30}}>Sign Up</Text>
        <UserInput
          name="Name"
          value={name}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
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
          title="Sign Up"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text style={{textAlign: 'center'}}>
          Already Joined?{' '}
          <Text
            style={{color: '#ff2222'}}
            onPress={() => navigation.navigate('Signin')}>
            Sign In
          </Text>
        </Text>

        {/* <Text>{JSON.stringify({name, email, password}, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
