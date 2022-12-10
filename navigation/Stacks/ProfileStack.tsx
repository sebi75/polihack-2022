import { createStackNavigator } from "@react-navigation/stack";

import { ProfileScreen } from "../../screens/ProfileScreen/ProfileScreen";

import { CustomIconButton } from "../../components/CustomIconButton";
import Colors from "../../constants/Colors";
import { EditProfileScreen } from "../../screens/ProfileScreen/EditProfileScreen";

const ProfileStack = createStackNavigator();

export const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTintColor: "white",
      }}
    >
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          headerRight: () => {
            return (
              <CustomIconButton
                iconName={"settings"}
                color={Colors.primary}
                onPress={() => navigation.navigate("EditProfileScreen")}
                size={25}
                style={{ marginRight: 10 }}
              />
            );
          },
          headerLeft: () => undefined,
          title: "Profile",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintcolor: Colors.primary,
          headerTitleStyle: {
            color: Colors.primary,
          },
        })}
      />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
