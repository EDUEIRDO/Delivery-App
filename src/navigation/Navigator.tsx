import React from "react";
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { StatusBar, useColorScheme, StyleSheet, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import UserManagementScreen from "../screens/UserManagementScreen";
import LoginScreen from "../screens/LoginScreen";
import { AuthProvider } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

// Para que o react-navigation do tipo Stack funcione, definimos um type como lista de parametros das Screens que existem
// Tambem precisamos definir ela no Stack como um generic-type<>
/**
 * export type RootStackParamList = {
 * <Name of Screen>: Type;
 * }
 *
 * const Stack = createNativeStackNavigator<RootStackParamList>();
 */

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
    return (
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen}/>
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    )
}