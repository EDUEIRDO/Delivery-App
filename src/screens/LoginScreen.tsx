import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { DefaultButton } from "../components/DefaultButton";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/validators";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigator";

import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {

    const { loginUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigation<LoginScreenNavigationProp>();

    async function handleLogin() {
        if (!validateEmail(email)) {
            setError("Invalid email format");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            await loginUser({ email, password });
            setError("");
            Alert.alert("Login successful!");
            navigation.navigate('Home');
            
        } catch(err) {
            setError("Login failed. Check credentials");
        }
    }

    return (
        <View style={styles.container}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        <DefaultButton title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 12, padding: 8 },
  error: { color: "red", marginBottom: 8 },
});