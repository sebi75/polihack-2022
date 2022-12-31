// import { StyleSheet, View, Text, Platform } from "react-native";
// import { FunctionComponent } from "react";

// import { createStackNavigator } from "@react-navigation/stack";

// import Colors from "../../constants/Colors";

// /* COMPONENTS */
// import { CustomIconButton } from "../../components/";

// /* import screens */
// // import { HomeScreen } from "../../screens/Home";

// const HomeStack = createStackNavigator();

// export const HomeStackNavigator: React.FC = () => {
//   return (
//     <HomeStack.Navigator
//       screenOptions={{
//         headerTintColor: "white",
//       }}
//     >
//       <HomeStack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={({ navigation }: { navigation: any }) => ({
//           title: HomeSettings.title,
//           headerStyle: {
//             backgroundColor: HomeSettings.backgroundColor,
//           },
//           headerTintColor: HomeSettings.titleColor,
//           headerLeft: () => (
//             <View>
//               <CustomIconButton
//                 iconName={"ios-camera"}
//                 size={25}
//                 color={"white"}
//                 onPress={() => navigation.navigate("CameraStackNavigator")}
//               />
//             </View>
//           ),
//           headerRight: () => (
//             <View style={{ flexDirection: "row" }}>
//               {/* <CustomIconButton
//                 style={{ marginRight: 10 }}
//                 iconName={"ios-add-circle-outline"}
//                 size={25}
//                 color={"white"}
//                 onPress={testAsync}
//               /> */}
//               <CustomIconButton
//                 style={{ marginRight: 10 }}
//                 iconName={"ios-add-circle-outline"}
//                 size={25}
//                 color={"white"}
//                 onPress={() => navigation.navigate("CreatePostModal")}
//               />
//               <CustomIconButton
//                 iconName={"ios-send"}
//                 size={25}
//                 color={"white"}
//                 onPress={() => navigation.navigate("InboxScreen")}
//               />
//             </View>
//           ),
//         })}
//       />
//     </HomeStack.Navigator>
//   );
// };

// export const HomeSettings = {
//   title: "Jobs",
//   backgroundColor: Platform.OS === "ios" ? Colors.dark : Colors.dark,
//   titleColor: "white",
// };
