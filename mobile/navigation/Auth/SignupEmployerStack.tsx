import { FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
	SignupEmployerFirstScreen,
	SignupEmployerSecondScreen,
	SignupEmployerThirdScreen,
} from '../../screens/Authentication/Signup';
import Colors from '../../constants/Colors';

import { useNavigation } from '@react-navigation/native';
import { CustomIconButton } from '../../components';

const SignupEmployerStack = createStackNavigator();

export const SignupEmployerStackNavigator: FunctionComponent = () => {
	const navigation: any = useNavigation();

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
					gestureEnabled: false,
					headerTitle: '',
					headerTintColor: Colors.primary,
					headerBackTitleVisible: false,
					headerShadowVisible: false,
					headerStatusBarHeight: 70,
					headerLeft: () => {
						return (
							<CustomIconButton
								onPress={() => navigation.navigate('SignupEmployerFirstScreen')}
								iconName="arrow-back-circle"
								color={Colors.primary}
								size={45}
								style={{ marginLeft: 10 }}
							/>
						);
					},
				}}
			/>
			<SignupEmployerStack.Screen
				name="SignupEmployerThirdScreen"
				component={SignupEmployerThirdScreen as any}
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
								onPress={() => navigation.goBack()}
								iconName="arrow-back-circle"
								color={Colors.primary}
								size={45}
								style={{ marginLeft: 10 }}
							/>
						);
					},
				}}
			/>
		</SignupEmployerStack.Navigator>
	);
};
