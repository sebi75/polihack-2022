import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { JobsScreen } from "../../screens/Jobs";
import { JobDetailScreen } from "../../screens/Jobs/JobDetailScreen";
import Colors from "../../constants/Colors";

const JobsStack = createStackNavigator();

export const JobsStackNavigator = () => {
  return (
    <JobsStack.Navigator
      screenOptions={{
        headerTintColor: Colors.primary,
      }}
    >
      <JobsStack.Screen
        name="JobsScreen"
        component={JobsScreen}
        options={{ title: "Jobs List" }}
      />
      <JobsStack.Screen
        name="JobDetailScreen"
        component={JobDetailScreen as any}
        options={{ title: "Job Detail Screem" }}
      />
    </JobsStack.Navigator>
  );
};
