import { View, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { mockUser } from "../../mocks/user";
import { createUser } from "../../api/user/createUser";
import { getUser } from "../../api/user/getUser";

import { getUserFromAsyncStorage } from "../../utils/asyncStorage";
import { useGetUser } from "../../hooks";

export const StartupScreen: React.FC = () => {
  // const dispatch = useAppDispatch()
  const navigation: any = useNavigation();
  const { data, isLoading, error } = useGetUser(); // get user in state if any

  console.log({ data, isLoading, error });

  // const handlecreateUser = async () => {
  //   try {
  //     const response = await createUser(mockUser);
  //   } catch (error) {
  //     return;
  //   }
  // };

  const tryLogin = async () => {
    try {
      const user = await getUserFromAsyncStorage();

      if (!user) {
        navigation.navigate("AuthStackNavigator");
        return;
      }

      // const { uid, email, username, description, profilePicture } =
      //   parsedUserData
      // dispatch(setUser({ uid, email, username, description, profilePicture }))

      navigation.navigate("BottomTabNavigator");
    } catch (error) {}
  };

  useEffect(() => {
    console.log("run useeffect in startupscreen");
    navigation.navigate("BottomTabNavigator");
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
