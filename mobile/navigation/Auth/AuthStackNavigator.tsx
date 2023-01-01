import { createStackNavigator } from '@react-navigation/stack';
import { SignupScreen } from '../../screens/Authentication/Signup/';
import { SigninScreen } from '../../screens/Authentication/Signin/';

import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useGetToken } from '../../hooks';

const AuthenticationStack = createStackNavigator();

export const AuthStackNavigator: React.FC = () => {
	const navigation: any = useNavigation();
	const { data: tokenData, isLoading } = useGetToken();

	//is there is no token found, navigate to signinscreen
	//if there is a token and the user is in this navigator,
	//navigate him to the bottomtabnavigator
	useEffect(() => {
		if (isLoading) {
			return;
		}
		if (!tokenData) {
			return navigation.navigate('SigninScreen');
		}

		return navigation.navigate('BottomTabNavigator');
	}, [tokenData]);

	return (
		<AuthenticationStack.Navigator>
			{/* we need a user default signup screen */}
			{/* and a slight different flow for signing up employers */}
			<AuthenticationStack.Screen
				name="SignupScreen"
				component={SignupScreen}
				options={{
					headerShown: false,
				}}
			/>
			<AuthenticationStack.Screen
				name="SigninScreen"
				component={SigninScreen}
				options={{
					headerShown: false,
				}}
			/>
		</AuthenticationStack.Navigator>
	);
};
