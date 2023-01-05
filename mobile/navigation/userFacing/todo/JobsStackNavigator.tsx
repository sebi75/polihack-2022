import React, { FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { JobsScreen } from '../../../screens/userFacing/Jobs';
import { JobDetailScreen } from '../../../screens/userFacing/Jobs';
import Colors from '../../../constants/Colors';

const JobsStack = createStackNavigator();

export const JobsStackNavigator: FunctionComponent = () => {
	return (
		<JobsStack.Navigator
			screenOptions={{
				headerTintColor: Colors.primary,
				gestureEnabled: true,
				headerShown: false,
			}}
		>
			<JobsStack.Screen
				name="JobsScreen"
				component={JobsScreen}
				options={{ title: 'Jobs List' }}
			/>
			<JobsStack.Screen
				name="JobDetailScreen"
				component={JobDetailScreen as any}
				options={{
					title: 'Details',
					headerShown: true,
					headerBackTitle: 'Back',
				}}
			/>
		</JobsStack.Navigator>
	);
};
