import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { DefaultButton } from "../components/DefaultButton";
import User from "../types/user";

export default function UserManagementScreen() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const API_URL: string = 'http://192.168.0.104:8080';

    // const fetchUsers = async () => {
    //     const response = await fetch("http://192.168.0.104:8080/users");
    //     const data = await response.json();
    //     setUsers(data);
    // };

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    // List users of database
    async function loadUsers() {
        try {
            const response = await fetch(`${API_URL}/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error searching users:", error);
        } finally {
            setLoading(false);
        }
    };

    // Run only opening the screen
    useEffect(() => {
        loadUsers();
    }, []);

            // Insert users in database
    async function handleSubmit() {
        if (!name || !email || !password) {
            console.warn("Please fill in all entries");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name, email, password }),
            });
            if (!response.ok) throw new Error("Error saving user");

            const newUser: User = await response.json();

            // Update list without need call fetch
            setUsers((prev) => [...prev, newUser]);

            // Clean inputs
            setName("");
            setEmail("");
            setPassword("");

        } catch(error) {
            console.error("Error creating user: ", error);
        };
    }

    async function handleDelete(id: number) {
        try {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'DELETE',
                // headers: {'Content-Type': 'application/json'},
                // body: JSON.stringify({ name, email }),
            });
            if (!response.ok) throw new Error("Error deleting user");
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch(err) {
            console.error("Error in function handleDelete", err);
        };
    };

    // async function handleVerification() {
    //     if (!name || !email) {
    //         console.warn("Please fill in all entries");
    //         try {
    //             const response = await fetch(`${API_URL}/users`, {
    //                 headers: {'Content-Type': 'application/json'},
    //                 body: JSON.stringify({ name, email }),
    //             })
    //             if (!response.ok) throw new Error("Error verificating user");

    //         } catch(error) {

    //         }
    //     }

    // }

    // if (loading) {
    //     return (
    //         <View style={styles.center}>
    //             <Text>Loading...</Text>
    //         </View>
    //     );
    // }

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <DefaultButton title="Submit" onPress={handleSubmit} />

            {/* list */}
            <FlatList data={users} keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list} renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email} >{item.email}</Text>
                    <Text >{item.id}</Text>
                    <DefaultButton title="Delete" onPress={() => handleDelete(item.id)} />
                </View>
            )}/>
        </View>
    );
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