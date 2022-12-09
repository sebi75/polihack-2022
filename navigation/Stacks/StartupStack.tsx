import { createStackNavigator } from "@react-navigation/stack";

import { StartupScreen } from "../../screens/StartupScreen/StartupScreen";
import { BottomTabNavigator } from "../Bottom/BottomTabNavigator";
import { AuthStackNavigator } from "../Auth";

const StartupStack = createStackNavigator();

export const StartupStackNavigator: React.FC = () => {
  return (
    <StartupStack.Navigator
      screenOptions={{
        //disable swipe to go back from the main application
        //to the authstack when users are already logged in
        gestureEnabled: false,
      }}
    >
      <StartupStack.Screen
        name="StartupScreen"
        component={StartupScreen}
        options={{
          headerShown: false,
        }}
      />
      <StartupStack.Screen
        name={"AuthStackNavigator"}
        component={AuthStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <StartupStack.Screen
        name={"BottomTabNavigator"}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </StartupStack.Navigator>
  );
};
