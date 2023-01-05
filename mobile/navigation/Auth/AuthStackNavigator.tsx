import { createStackNavigator } from '@react-navigation/stack';
import { SigninScreen } from '../../screens/Authentication/Signin/';
import { ForgotPasswordScreen } from '../../screens/Authentication/ForgotPassword';
import { SignupStackNavigator } from './SignupStackNavigator';

import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useGetToken } from '../../hooks';
import Colors from '../../constants/Colors';
import { CustomIconButton } from '../../components';

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

		return navigation.navigate('MainEntryUserBottomTabNavigator');
	}, [tokenData]);

	return (
		<AuthenticationStack.Navigator>
			<AuthenticationStack.Screen
				name="SignupScreen"
				component={SignupStackNavigator}
				options={{
					headerShown: false,
					gestureEnabled: false,
				}}
			/>
			<AuthenticationStack.Screen
				name="SigninScreen"
				component={SigninScreen}
				options={{
					headerShown: false,
					gestureEnabled: false,
				}}
			/>
			<AuthenticationStack.Screen
				name="ForgotPasswordScreen"
				component={ForgotPasswordScreen}
				options={{
					gestureEnabled: false,
					headerTitle: '',
					headerTintColor: Colors.primary,
					headerBackTitleVisible: false,
					headerShadowVisible: false,
					headerStatusBarHeight: 70,
					headerLeft: () => {
						return (
							<CustomIconButton
								onPress={() => navigation.navigate('SigninScreen')}
								iconName="arrow-back-circle"
								color={Colors.primary}
								size={45}
								style={{ marginLeft: 10 }}
							/>
						);
					},
				}}
			/>
		</AuthenticationStack.Navigator>
	);
};
