import React from 'react';
import {Text, TextInput, View} from 'react-native';

const UserInput = ({
  name,
  value,
  setValue,
  autoCapitalize = 'none',
  keyboardType = 'default',
  secureTextEntry = false,
}) => {
  return (
    <View style={{marginHorizontal: 24}}>
      <Text style={{fontSize: 15}}>{name}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={{
          borderBottomWidth: 1,
          height: 40,
          borderBottomColor: '#8e93a1',
          marginBottom: 20,
        }}
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
  );
};

export default UserInput;
