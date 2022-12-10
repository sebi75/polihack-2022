import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserModel } from "../api/models";

export const getUserFromAsyncStorage = async (): Promise<IUserModel | null> => {
  try {
    const user: string | null = await AsyncStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);

      return parsedUser;
    }
  } catch (error) {
    console.log(error, "returning user from Async Storage");
  }

  return null;
};

export const setUserToAsyncStorage = async (
  user: IUserModel
): Promise<void> => {
  const stringifiedUser = JSON.stringify(user);

  try {
    await AsyncStorage.setItem("user", stringifiedUser);
  } catch (error) {
    console.log("setting the user in async storage");
  }
};

export const removeFromAsyncStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log("error removing user form async storage");
  }
};
