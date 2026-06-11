import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; 
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleLogin = () => { 
    if (username === 'admin' && password === '123456789') {
      setError('');
      console.log('Login successful!');
      navigation.navigate('Home'); 
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />  
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <CustomButton title="Login" onPress={handleLogin} />
      
      <View style={styles.spacer} />
      <CustomButton 
      title="Don't have an account? Sign Up" 
      onPress={() => navigation.navigate('SignUp')} 
      backgroundColor="transparent" 
      textColor="#666666" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 12, paddingHorizontal: 10 },
  errorText: { color: 'red', marginBottom: 10 },
  spacer: { height: 20 }
});

export default LoginScreen;