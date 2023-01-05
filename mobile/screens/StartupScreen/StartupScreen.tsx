import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { removeTokenFromAsyncStorage } from '../../utils/asyncStorage';
import { useValidateToken } from '../../hooks';
import { useGetClientUser } from '../../hooks';

export const StartupScreen: React.FC = () => {
	const navigation: any = useNavigation();
	const postValidateToken = useValidateToken();
	const { refetch } = useGetClientUser(false);

	//here we will know that the token is validated by the user
	//and it can either have employerId or not
	//if it has employerId then we will navigate to the employer facing app
	//if it does not have employerId then we will navigate to the usual user facing app
	const tryLogin = async (): Promise<any> => {
		try {
			postValidateToken.mutate(
				{},
				{
					onSuccess: () => {
						refetch();
						return navigation.navigate('MainEntryUserBottomTabNavigator');
					},
					onError: async () => {
						await removeTokenFromAsyncStorage();
						return navigation.navigate('AuthStackNavigator');
					},
				}
			);
		} catch (error) {
			console.log('error in authentication', error);
			return tryLogin(); // some type of retry logic is something went wrong
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
