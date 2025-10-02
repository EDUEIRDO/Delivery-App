import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
    title: string;
    onPress: () => void;
};

export function DefaultButton({title, onPress}: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6200ee',
        padding: 22,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    text: {
        color: '#fff',
        fontSize:  16,
        fontWeight: '600',
    },
})