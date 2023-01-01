import { createStackNavigator } from '@react-navigation/stack';
import { SignupScreen } from '../../screens/Authentication/Signup/';
import { SigninScreen } from '../../screens/Authentication/Signin/';

import { CustomIconButton } from '../../components';
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
			<AuthenticationStack.Screen
				name="SignupScreen"
				component={SignupScreen}
				options={({ navigation, route }: { navigation: any; route: any }) => ({
					headerRight: () => {
						return (
							<CustomIconButton
								iconName={'ios-home'}
								color={'black'}
								size={25}
								onPress={() => navigation.navigate('BottomTabNavigator')}
							/>
						);
					},
					headerShown: false,
				})}
			/>
			<AuthenticationStack.Screen
				name="SigninScreen"
				component={SigninScreen}
				options={({ navigation, route }: { navigation: any; route: any }) => ({
					headerShown: false,
				})}
			/>
		</AuthenticationStack.Navigator>
	);
};
