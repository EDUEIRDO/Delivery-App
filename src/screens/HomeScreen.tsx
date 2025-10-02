import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { DefaultButton } from "../components/DefaultButton";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
    {
        id: '1',
        title: 'First Item',
    },
    {
        id: '2',
        title: 'Second Item',
    },
    {
        id: '3',
        title: 'Third Item',
    },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => {
    return (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
    )
};


export default function HomeScreen() {
    // const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <FlatList 
                data={DATA}
                renderItem={({item}) => <Item title={item.title} />}
                keyExtractor={item => item.id}
            />
            {/* <Text style={styles.title}>Hello World!</Text>
            <Text style={styles.counter}>Vc clicou {count} vezes!</Text>
            <DefaultButton title="Clique aqui" onPress={() => setCount(count + 1)}/> */}
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
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
})