import { FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useNavigation } from '@react-navigation/native';
import { SignupUserScreen } from '../../screens/Authentication/Signup';
import { SignupEmployerStackNavigator } from './SignupEmployerStack';

const SignupStack = createStackNavigator();

export const SignupStackNavigator: FunctionComponent = () => {
	const navigation: any = useNavigation();

	return (
		<SignupStack.Navigator initialRouteName="SignupUserScreen">
			{/* we need a user default signup screen */}
			{/* and a slight different flow for signing up employers */}
			<SignupStack.Screen
				name="SignupUserScreen"
				component={SignupUserScreen}
				options={{
					headerShown: false,
					gestureEnabled: false,
				}}
			/>
			<SignupStack.Screen
				name="SignupEmployerScreen"
				component={SignupEmployerStackNavigator}
				options={{
					headerShown: false,
					gestureEnabled: false,
				}}
			/>
		</SignupStack.Navigator>
	);
};
