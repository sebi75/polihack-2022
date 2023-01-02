import { FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
	SignupEmployerFirstScreen,
	SignupEmployerSecondScreen,
	SignupEmployerThirdScreen,
} from '../../screens/Authentication/Signup';

const SignupEmployerStack = createStackNavigator();

export const SignupEmployerStackNavigator: FunctionComponent = () => {
	return (
		<SignupEmployerStack.Navigator initialRouteName="SignupUserScreen">
			<SignupEmployerStack.Screen
				name="SignupEmployerFirstScreen"
				component={SignupEmployerFirstScreen}
				options={{
					headerShown: false,
				}}
			/>
			<SignupEmployerStack.Screen
				name="SignupEmployerSecondScreen"
				component={SignupEmployerSecondScreen as any}
				options={{
					headerShown: false,
				}}
			/>
			<SignupEmployerStack.Screen
				name="SignupEmployerThirdScreen"
				component={SignupEmployerThirdScreen as any}
				options={{
					headerShown: false,
				}}
			/>
		</SignupEmployerStack.Navigator>
	);
};
