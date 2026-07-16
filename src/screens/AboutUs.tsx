import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {  DrawerParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<DrawerParamList, 'AboutUs'>;

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.content}>
        Welcome to YamenRM Todo App! We are dedicated to helping you stay organized , productive and Healthy.
      </Text>
      <Text style={styles.footer}>
        All rights reserved © 2026 YamenRM. This app is designed to provide a seamless experience for managing your tasks and improving your productivity.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontFamily: 'Yuyu',
    fontSize: 24,
    color: '#008cff',
    marginBottom: 15,
  },
  content: {
    fontFamily: 'Yuyu',
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    fontFamily: 'Yuyu',
    fontSize: 14,
    color: '#666666',
  },
});

export default AboutUsScreen;