import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

import { HideKeyboardView } from "../../../components/";

import { setUserToAsyncStorage } from "../../../utils/asyncStorage";

import Colors from "../../../constants/Colors";

import { CustomInput } from "../../../components/CustomInput";
import { CustomButton } from "../../../components";
import formReducer from "../../../components/CustomInput/inputReducer";
import { ErrorComponent } from "../../../components/ErrorComponent";

import { useNavigation } from "@react-navigation/native";
import { useCallback, useReducer } from "react";
import { signInWithEmail } from "../../../api";
import { useGetUser } from "../../../hooks";

const FORM_UPDATE = "FORM_UPDATE";

const { width } = Dimensions.get("window");
export const SigninScreen: React.FC = () => {
  const { data, isLoading, error } = useGetUser();
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const [signinError, setSigninError] = useState<string | undefined>(undefined);
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
          await setUserToAsyncStorage(response);

          navigation.navigate("BottomTabNavigator");
        } else {
          setSigninError("Something went wrong");
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (data) {
      navigation.navigate("BottomTabNavigator");
    }
  }, [data]);

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

        {signinError != undefined ? (
          <ErrorComponent errorMessage={signinError} />
        ) : (
          <View style={{ height: 30 }}></View>
        )}

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
    fontSize: 30,
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
