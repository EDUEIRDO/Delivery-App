import React from "react";
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { StatusBar, useColorScheme, StyleSheet, Text } from 'react-native';
import { RootStack } from "./navigation/Navigator";

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

    return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.container}>
        <RootStack />
      </SafeAreaView>
    </SafeAreaProvider>
  );

  // return (
  //   <AuthProvider>
  //     <AppNavigator />
  //   </AuthProvider>
  // );
}

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <SafeAreaView style={styles.container}>
//         {/* <HomeScreen/> */}
//         {/* <UserManagementScreen/> */}
//         <AuthProvider>
//           <LoginScreen/>
//         </AuthProvider>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>

const styles = StyleSheet.create({
  container: {
    flex: 1,                // ocupa a tela inteira
    backgroundColor: '#ffffff33' // fundo branco pra garantir
  },
  hello: {
    color: '#000',          // cor visível
    fontSize: 20,
    margin: 16,
  }
});