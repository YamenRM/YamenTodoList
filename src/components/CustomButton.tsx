import React from 'react';
import { Pressable, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string; 
  textColor?: string;       
}

const CustomButton = ({ 
  title, 
  onPress, 
  backgroundColor = '#007AFF', 
  textColor = '#FFFFFF' 
}: CustomButtonProps) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={onPress}
      >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;