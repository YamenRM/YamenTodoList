import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProfileScreen from './src/screens/profile';
import LoginScreen from './src/screens/Login';
import SignUpScreen from './src/screens/SignUp';
import HomeScreen from './src/screens/Home';
import TaskDetailesScreen from './src/screens/Task-Detailes';
import SettingsScreen from './src/screens/Settings';
import AboutUsScreen from './src/screens/AboutUs';


export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  DrawerRoot: undefined; 
  TaskDetailes: {
    name: string;
    description: string;
    imageUrl: string;
  };
};

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  AboutUs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();


function MyTabsComponent() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}> 
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}


function MyDrawerComponent() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen 
        name="MainTabs" 
        component={MyTabsComponent} 
        options={{ drawerLabel: 'Dashboard', title: 'Todo App' }}
      />
      <Drawer.Screen 
        name="AboutUs" 
        component={AboutUsScreen} 
        options={{ drawerLabel: 'About Us', title: 'About Us' }}
      />
    </Drawer.Navigator>
  );
}


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen 
            name="DrawerRoot" 
            component={MyDrawerComponent} 
            options={{ headerShown: false }} 
          /> 
          <Stack.Screen name="TaskDetailes" component={TaskDetailesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
