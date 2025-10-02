import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { DefaultButton } from "../components/DefaultButton";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function HomeScreen() {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello World!</Text>
            <Text style={styles.counter}>Vc clicou {count} vezes!</Text>
            <DefaultButton title="Clique aqui" onPress={() => setCount(count + 1)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    counter: {
        fontSize: 18,
        marginBottom: 8,
    }
})