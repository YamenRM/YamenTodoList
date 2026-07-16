import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; 
import CustomButton from '../components/CustomButton';
import { SUPABASE_URL, getHeaders } from '../config/supabase';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      const token = data.access_token;
      const user = data.user;
      
      if (!response.ok) {
        throw new Error(data.error_description || data.message || 'Login failed');
      }
      
      console.log('Login successful! Token:', token , 'User:', user);
      
      navigation.navigate('DrawerRoot'); 
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />  
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <CustomButton title={loading ? "Logging in..." : "Login"} onPress={handleLogin} />
      
      <View style={styles.spacer} />
      <CustomButton 
      title="Don't have an account? Sign Up" 
      onPress={() => navigation.navigate('SignUp')} 
      backgroundColor="transparent" 
      textColor="#000000" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#ffffff' },
  title: { fontSize: 28, fontFamily: 'Yuyu', fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 40, borderColor: '#ccc', borderWidth: 2, borderRadius: 7, marginBottom: 10, paddingHorizontal: 10 },
  errorText: { color: 'red', marginBottom: 10 },
  spacer: { height: 60 }
});

export default LoginScreen;