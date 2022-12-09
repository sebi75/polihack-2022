import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { HomeStackNavigator } from "../Stacks/HomeStackNavigator";
import { Platform, View } from "react-native";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => {
        return {
          tabBarBackground: () => {
            return Platform.OS === "android" ? (
              <View style={{ backgroundColor: "black" }} />
            ) : (
              <BlurView tint="dark" intensity={95} style={{ flex: 1 }} />
            );
          },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "black",
          },
        };
      }}
    >
      {/* SERVES AS THE MAIN ENTRY TO THE APPLICATION */}
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            if (focused) {
              return <Ionicons name={"ios-home"} size={25} color={"white"} />;
            }
            return (
              <Ionicons name={"ios-home-outline"} size={25} color={"white"} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
