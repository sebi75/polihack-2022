import React, { FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { JobsApplicationsScreen } from '../../screens/JobsApplications/JobsApplicationsScreen';
import { JobDetailScreen } from '../../screens/Jobs/JobDetailScreen';
import Colors from '../../constants/Colors';
// import { useGetUser } from "../../hooks";

const JobsApplicationsStack = createStackNavigator();

export const JobsApplicationsStackNavigator: FunctionComponent = () => {
	// const { data: userData } = useGetUser();

	return (
		<JobsApplicationsStack.Navigator
			screenOptions={{
				headerTintColor: Colors.primary,
				gestureEnabled: true,
			}}
		>
			<JobsApplicationsStack.Screen
				name="JobsApplicationsScreen"
				initialParams={{
					userId: 'placeholder',
				}}
				component={JobsApplicationsScreen as any}
				options={{
					title: 'Applications',
					headerLeft: () => undefined,
					headerShown: false,
				}}
			/>
			<JobsApplicationsStack.Screen
				name="JobDetailScreen"
				component={JobDetailScreen as any}
				options={{
					title: 'Details',
					headerShown: true,
					headerBackTitle: 'Back',
				}}
			/>
		</JobsApplicationsStack.Navigator>
	);
};
