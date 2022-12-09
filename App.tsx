import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

/* IMPORT SCREENS */
import { StartupScreen } from "./screens/StartupScreen/StartupScreen";

import { NavigationContainer } from "@react-navigation/native";

import { StartupStackNavigator } from "./navigation/Stacks/StartupStack";

import { enableScreens } from "react-native-screens";

import "react-native-gesture-handler";

enableScreens();

export default function App() {
  // const asyncFetchUserData = useCallback(async () => {
  //   try {
  //     console.log("fething the user data from the async storage")
  //     const userdata = await fetchUserFromAsyncStorage()
  //     console.log(userdata)
  //   } catch (error) {
  //     console.log("error in fethching user data", error)
  //   }
  // }, [])

  // useEffect(() => {
  //   asyncFetchUserData()
  // }, [])

  return (
    <NavigationContainer>
      <StartupStackNavigator />
    </NavigationContainer>
  );
}
