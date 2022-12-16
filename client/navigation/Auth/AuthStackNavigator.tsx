import { createStackNavigator } from "@react-navigation/stack";
import { SignupScreen } from "../../screens/Authentication/Signup/";
import { SigninScreen } from "../../screens/Authentication/Signin/";

import { CustomIconButton } from "../../components";

const AuthenticationStack = createStackNavigator();

export const AuthStackNavigator: React.FC = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          headerRight: () => {
            return (
              <CustomIconButton
                iconName={"ios-home"}
                color={"black"}
                size={25}
                onPress={() => navigation.navigate("BottomTabNavigator")}
              />
            );
          },
          headerShown: false,
        })}
      />
      <AuthenticationStack.Screen
        name="SigninScreen"
        component={SigninScreen}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          headerShown: false,
        })}
      />
    </AuthenticationStack.Navigator>
  );
};
