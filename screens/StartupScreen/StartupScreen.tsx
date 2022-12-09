import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export const StartupScreen: React.FC = () => {
  // const dispatch = useAppDispatch()
  const navigation: any = useNavigation();

  // const tryLogin = async () => {
  //   try {
  //     const loggedInUser = await AsyncStorage.getItem("loggedInUser");

  //     if (!loggedInUser) {
  //       navigation.navigate("AuthStackNavigator");
  //       return;
  //     }
  //     const parsedLoggedInUser = JSON.parse(loggedInUser);
  //     const cachedUserData = await AsyncStorage.getItem(parsedLoggedInUser.uid);

  //     if (!cachedUserData) {
  //       navigation.navigate("AuthStackNavigator");
  //       return;
  //     }

  //     // const { uid, email, username, description, profilePicture } =
  //     //   parsedUserData
  //     // dispatch(setUser({ uid, email, username, description, profilePicture }))

  //     navigation.navigate("BottomTabNavigator");
  //   } catch (error) {}
  // };

  useEffect(() => {
    console.log("run useeffect in startupscreen");
    // tryLogin();
  }, []);

  return <View style={styles.screen}></View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
