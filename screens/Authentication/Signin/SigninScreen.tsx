import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { HideKeyboardView } from "../../../components/";

import Colors from "../../../constants/Colors";

import { CustomInput } from "../../../components/CustomInput";
import { CustomButton } from "../../../components";
import formReducer from "../../../components/CustomInput/inputReducer";
import { ErrorComponent } from "../../../components/ErrorComponent";

import { useNavigation } from "@react-navigation/native";
import { useCallback, useReducer } from "react";
import { signInWithEmail } from "../../../api";

const FORM_UPDATE = "FORM_UPDATE";

const { width, height } = Dimensions.get("window");
export const SigninScreen: React.FC = () => {
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const navigation: any = useNavigation();

  const inputChangeHandler = useCallback(
    (inputIdentifier: any, inputValue: any, inputValidity: any) => {
      formDispatch({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputId: inputIdentifier,
      });
    },
    [formDispatch]
  );

  const signInHandler = async () => {
    try {
      if (formState?.isFormValid) {
        const { email, password } = formState.inputValues;
        const response = await signInWithEmail(email, password);
        if (response) {
          console.log(response);
          // const userData = response.payload as User

          // await AsyncStorage.setItem(
          //   "loggedInUser",
          //   JSON.stringify({ uid: userData.uid })
          // )
          // await AsyncStorage.setItem(userData.uid, JSON.stringify(userData))
          // navigation.navigate("BottomTabNavigator")
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigation.navigate("BottomTabNavigator")
  //   }
  // }, [])

  return (
    <HideKeyboardView withAvoidView>
      <View style={styles.inputContainer}>
        <Text style={styles.mainTextLabelStyle}>Sign In</Text>
        <CustomInput
          id={"email"}
          label={"Email"}
          keyboardType={"email-address"}
          required
          email
          autoCapitalize={"none"}
          errorText={"Please enter a valid email address!"}
          initialValue={""}
          onInputChange={inputChangeHandler}
        />
        <CustomInput
          id={"password"}
          label={"Password"}
          secureTextEntry
          required
          minLength={5}
          errorText={"Please enter a valid password!"}
          initialValue={""}
          onInputChange={inputChangeHandler}
        />

        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.redirectToSigninStyle}>
            Don't have an account?
          </Text>
        </TouchableOpacity>

        {/* {error != undefined ? (
          <ErrorComponent errorMessage={error} />
        ) : (
          <View style={{ height: 30 }}></View>
        )} */}

        <CustomButton
          title="Sign In"
          onPress={signInHandler}
          buttonStyle={{
            width: width * 0.5,
            alignSelf: "center",
            marginTop: 25,
            backgroundColor: Colors.buttonColors.primary,
          }}
        />
      </View>
    </HideKeyboardView>
  );
};

const styles = StyleSheet.create({
  screen: {
    width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark,
  },
  inputContainer: {
    width: width * 0.8,
    height: "auto",
  },
  mainTextLabelStyle: {
    fontSize: 31,
    fontWeight: "bold",
    color: Colors.primary,
  },
  redirectToSigninStyle: {
    fontSize: 13,
    textDecorationLine: "underline",
    marginTop: 10,
    color: Colors.primary,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },

  errorTextStyle: {
    fontSize: 14,
    color: "red",
  },
});

interface SignButtonComponentProps {
  isLoading: boolean;
  formState: any;
  dispatch: any;
  navigation: any;
}

// const SignButtonComponent: React.FC<SignButtonComponentProps> = ({
//   isLoading,
//   formState,
//   dispatch,
//   navigation,
// }) => {
//   const signInHandler = async () => {
//     try {
//       if (formState?.isFormValid) {
//         // const response = await dispatch(
//         //   signInWithEmailThunk({
//         //     email: formState.inputValues.email,
//         //     password: formState.inputValues.password,
//         //   })
//         // )
//         // if (response.payload) {
//         //   const userData = response.payload as User

//         //   await AsyncStorage.setItem(
//         //     "loggedInUser",
//         //     JSON.stringify({ uid: userData.uid })
//         //   )
//         //   await AsyncStorage.setItem(userData.uid, JSON.stringify(userData))
//         //   navigation.navigate("BottomTabNavigator")
//         // }
//       }
//     } catch (error: any) {
//       throw new Error(error.message)
//     }
//   }

//   if (isLoading) {
//     return (
//       <ActivityIndicator
//         size={"small"}
//         color={"red"}
//         style={{ marginTop: 25 }}
//       />
//     )
//   }
//   return (
//     <CustomButton
//       title="Sign In"
//       onPress={signInHandler}
//       buttonStyle={{
//         width: width * 0.5,
//         alignSelf: "center",
//         marginTop: 25,
//         backgroundColor: Colors.buttonColors.primary,
//       }}
//     />
//   )
// }

const initialFormState = {
  inputValues: {
    email: "",
    password: "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  isFormValid: false,
};
