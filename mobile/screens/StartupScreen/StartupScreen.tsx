import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { removeTokenFromAsyncStorage } from '../../utils/asyncStorage';
import { useValidateToken } from '../../hooks';
// import { useGetUser } from "../../hooks";

export const StartupScreen: React.FC = () => {
	const navigation: any = useNavigation();
	const postValidateToken = useValidateToken();
	// const { data, isLoading, error } = useGetUser(); // get user in state if any

	const tryLogin = async (): Promise<any> => {
		try {
			postValidateToken.mutate(
				{},
				{
					onSuccess: () => {
						console.log('token successully validated');
						return navigation.navigate('BottomTabNavigator');
					},
					onError: async () => {
						console.log('token expired');
						await removeTokenFromAsyncStorage();
						return navigation.navigate('AuthStackNavigator');
					},
				}
			);
		} catch (error) {
			return tryLogin(); // some type of retry logic is something went wrong
			// throw Error('Oops! Something went wrong');
		}
	};

	useEffect(() => {
		tryLogin();
	}, []);

	return <View style={styles.screen}></View>;
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
	},
});
