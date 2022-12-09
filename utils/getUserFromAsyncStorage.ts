import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserFromAsyncStorage = async () => {
  const loggedInUser: any = await AsyncStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const parsedLoggedInUser = JSON.parse(loggedInUser);
    const cachedUserData = AsyncStorage.getItem(parsedLoggedInUser.uid);

    return cachedUserData;
  } else {
    return null;
  }
};
