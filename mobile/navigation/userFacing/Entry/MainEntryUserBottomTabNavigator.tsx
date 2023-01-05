import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { BlurView } from 'expo-blur';

import { JobsStackNavigator } from '../todo/JobsStackNavigator';
import { Platform, View } from 'react-native';
import ProfileStackNavigator from '../Profile/ProfileStack';
import { JobsApplicationsStackNavigator } from '../todo/JobApplicationsStack';
import { useNavigation } from '@react-navigation/native';
import { useGetClientUser } from '../../../hooks';

const Tab = createBottomTabNavigator();

export const MainEntryUserBottomTabNavigator = () => {
	const navigation: any = useNavigation();
	const { data: clientUserData } = useGetClientUser(true);

	return (
		<Tab.Navigator
			screenOptions={() => {
				return {
					tabBarBackground: () => {
						return Platform.OS === 'android' ? (
							<View style={{ backgroundColor: 'white' }} />
						) : (
							<BlurView tint="dark" intensity={95} style={{ flex: 1 }} />
						);
					},
					headerShown: false,
					tabBarStyle: {
						backgroundColor: 'black',
					},
				};
			}}
		>
			{/* SERVES AS THE MAIN ENTRY TO THE APPLICATION */}
			<Tab.Screen
				name="JobsStackNavigator"
				component={JobsStackNavigator}
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ focused }: { focused: boolean }) => {
						if (focused) {
							return (
								<Ionicons name={'ios-clipboard'} size={25} color={'white'} />
							);
						}
						return (
							<Ionicons
								name={'ios-clipboard-outline'}
								size={25}
								color={'white'}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="JobsApplicationsStackNavigator"
				component={JobsApplicationsStackNavigator}
				options={{
					title: 'Applications',
					tabBarShowLabel: false,
					tabBarIcon: ({ focused }) => {
						if (focused) {
							return (
								<MaterialCommunityIcons
									name={'ab-testing'}
									size={25}
									color="white"
								/>
							);
						} else {
							return (
								<MaterialCommunityIcons
									name={'ab-testing'}
									size={25}
									color="white"
								/>
							);
						}
					},
				}}
			/>
			<Tab.Screen
				name="ProfileStackNavigator"
				component={ProfileStackNavigator}
				options={{
					title: 'Profile',
					tabBarShowLabel: false,
					tabBarIcon: ({ focused }) => {
						if (focused) {
							return (
								<MaterialCommunityIcons
									name={'face-man'}
									size={25}
									color="white"
								/>
							);
						} else {
							return (
								<MaterialCommunityIcons
									name={'face-man-outline'}
									size={25}
									color="white"
								/>
							);
						}
					},
				}}
			/>
		</Tab.Navigator>
	);
};
