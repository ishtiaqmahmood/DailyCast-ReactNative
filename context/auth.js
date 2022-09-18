import React, {useState, useEffect, createContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: '',
  });

  // config axios
  axios.defaults.baseURL = 'http://10.0.2.2:8000/api';

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem('@auth');
      const as = JSON.parse(data);
      setState({...state, user: as.user, token: as.token});
    };
    loadFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
