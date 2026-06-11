import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; 
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (password !== verifyPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!email.includes('@')) {
      setError('Invalid email address');
      return;
    }
    if (verificationCode !== '123456') {
      setError('Invalid verification code');
      return;
    }
    setError('');
    console.log('Sign up successful!');
    navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Verify Password" value={verifyPassword} onChangeText={setVerifyPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Verification Code (Try 123456)" value={verificationCode} onChangeText={setVerificationCode} keyboardType="numeric" />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <CustomButton title="Create Account" backgroundColor="#28a745"  onPress={handleSignUp} />
    
      <View style={styles.spacer} />
      <CustomButton 
      title="Don't have an account? Sign Up" 
      onPress={() => navigation.navigate('Login')} 
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

export default SignUpScreen;