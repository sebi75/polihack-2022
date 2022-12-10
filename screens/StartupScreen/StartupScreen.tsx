import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { getUserFromAsyncStorage } from "../../utils/asyncStorage";
import { useGetUser } from "../../hooks";

export const StartupScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const { data, isLoading, error } = useGetUser(); // get user in state if any

  console.log({ data, isLoading, error });

  const tryLogin = async () => {
    try {
      const user = await getUserFromAsyncStorage();

      if (!user) {
        return navigation.navigate("AuthStackNavigator");
      }

      console.log("Login Successful");
      return navigation.navigate("BottomTabNavigator");
    } catch (error) {
      throw Error("Oops! Something went wrong");
    }
  };

  useEffect(() => {
    console.log("run useeffect in startupscreen");
    // navigation.navigate("AuthStackNavigator");
    tryLogin();
    // navigation.navigate('BottomTabNavigator')
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
