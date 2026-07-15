import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable, Alert } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../App';

type Props = DrawerScreenProps<DrawerParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [userEmail, setUserEmail] = useState('');


  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to clear local temporary data?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", onPress: () => Alert.alert("Success", "Cache cleared!") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.sectionTitle}>App Preferences</Text>
      
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#008cff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Push Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificationsEnabled ? '#008cff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Account Info</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoKey}>Logged in as:</Text>
        <Text style={styles.infoValue}>{userEmail || 'Guest'}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>System</Text>
      <Pressable style={styles.actionButton} onPress={handleClearCache}>
        <Text style={styles.actionButtonText}>Clear App Cache</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.versionText}>Todo App v1.0.0</Text>
        <Text style={styles.madeWithText}>YamenRM</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Yuyu',
    fontSize: 22,
    color: '#008cff',
    marginBottom: 15,
    marginTop: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontFamily: 'Yuyu',
    fontSize: 18,
    color: '#333333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoKey: {
    fontFamily: 'Yuyu',
    fontSize: 18,
    color: '#666666',
  },
  infoValue: {
    fontFamily: 'Yuyu',
    fontSize: 18,
    color: '#111111',
  },
  actionButton: {
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtonText: {
    fontFamily: 'Yuyu',
    fontSize: 18,
    color: '#e74959',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  versionText: {
    fontFamily: 'Yuyu',
    fontSize: 14,
    color: '#999999',
  },
  madeWithText: {
    fontFamily: 'Yuyu',
    fontSize: 12,
    color: '#cccccc',
    marginTop: 4,
  }
});

export default SettingsScreen;