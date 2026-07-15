import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; 
import CustomButton from '../components/CustomButton';
import { SUPABASE_URL, getHeaders } from '../config/supabase';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (password !== verifyPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!email.includes('@')) {
      setError('Invalid email address');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          options: {
            data: {
              username: username.trim(), 
            },
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_description || data.message || 'Signup failed');
      }
      if (data.session) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('DrawerRoot')
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Verify Password" value={verifyPassword} onChangeText={setVerifyPassword} secureTextEntry />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <CustomButton title="Create Account" backgroundColor="#28a745"  onPress={handleSignUp} />
    
      <View style={styles.spacer} />
      <CustomButton 
      title="Already have an account? Login" 
      onPress={() => navigation.navigate('Login')} 
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

export default SignUpScreen;