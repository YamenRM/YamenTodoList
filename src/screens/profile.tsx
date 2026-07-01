import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { CommonActions, CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, RootTabParamList } from '../../App';
import CustomButton from '../components/CustomButton';


type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('Guest User');
  const [email, setEmail] = useState('guest@example.com');
  const [draftUsername, setDraftUsername] = useState(username);
  const [draftEmail, setDraftEmail] = useState(email);

  const startEdit = () => {
    setDraftUsername(username);
    setDraftEmail(email);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveProfile = () => {
    if (draftUsername.trim() === '' || draftEmail.trim() === '') {
      Alert.alert('Validation error', 'Username and email cannot be empty.');
      return;
    }

    setUsername(draftUsername.trim());
    setEmail(draftEmail.trim());
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={styles.avatar}
      />
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={draftUsername}
            onChangeText={setDraftUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={draftEmail}
            onChangeText={setDraftEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </>
      ) : (
        <>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </>
      )}

      <View style={styles.buttonWrapper}>
        {isEditing ? (
          <>
            <CustomButton
              title="Save"
              onPress={saveProfile}
              backgroundColor="#28A745"
            />
            <CustomButton
              title="Cancel"
              onPress={cancelEdit}
              backgroundColor="transparent"
              textColor="#000000"
            />
          </>
        ) : (
          <>
            <CustomButton
              title="Edit Profile"
              onPress={startEdit}
              backgroundColor="#008cff"
            />
            <CustomButton
              title="Logout"
              onPress={handleLogout}
              backgroundColor="#e74959"
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#E5E7EB',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 30,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
  },
});

export default ProfileScreen;
