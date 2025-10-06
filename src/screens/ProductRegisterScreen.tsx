import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { DefaultButton } from "../components/DefaultButton";
import Product from "types/product";

export default function ProductRegisterScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const API_URL: string = 'http://192.168.0.104:8080';

    async function loadProducts() {
        try {
            const response = await fetch(`${API_URL}/products`);
            const data = await response.json();
            setProducts(data);
        } catch(error) {
            console.error("Error searching products", error);
        }
    }
    useEffect(() => {
        loadProducts();
    }, []);

    return (
        // List
        <View>
            <FlatList data={products} keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.list} renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text>{item.name}</Text>
                  <Text>{item.price}</Text>
                </View>
            )}/>
        </View>
    )
}

const styles = StyleSheet.create({

    input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    },

    list: {
      padding: 16,
    },

    card: {
      padding: 16,
      marginBottom: 12,
      backgroundColor: "#f5f5f5",
      borderRadius: 8,
    },

    name: {
      fontSize: 18,
      fontWeight: "bold",
    },

    email: {
      fontSize: 14,
      color: "#555",
    },

    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

});