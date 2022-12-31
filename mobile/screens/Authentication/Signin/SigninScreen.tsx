import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

import { HideKeyboardView } from '../../../components/';

// import { setUserToAsyncStorage } from '../../../utils/asyncStorage';

import Colors from '../../../constants/Colors';

import { CustomInput } from '../../../components/CustomInput';
import { CustomButton } from '../../../components';
import { ErrorComponent } from '../../../components/ErrorComponent';
import { Controller, useForm } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native';
// import { useGetUser } from '../../../hooks';

const { width } = Dimensions.get('window');
export const SigninScreen: React.FC = () => {
	// const { data, isLoading, error } = useGetUser();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const handleSigninClick = (data: any) => {
		console.log(data);
	};

	const navigation: any = useNavigation();

	// useEffect(() => {
	// 	if (data) {
	// 		navigation.navigate('BottomTabNavigator');
	// 	}
	// }, [data]);

	return (
		<HideKeyboardView withAvoidView>
			<View style={styles.inputContainer}>
				<Text style={styles.mainTextLabelStyle}>Sign In</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'Email'}
							keyboardType={'email-address'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={'Please enter a valid email address!'}
							onChangeText={onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="password"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'Password'}
							keyboardType={'visible-password'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={'Please enter a valid password!'}
							onChangeText={onChange}
						/>
					)}
				/>

				<TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
					<Text style={styles.redirectToSigninStyle}>
						Don't have an account?
					</Text>
				</TouchableOpacity>

				{/* {signinError != undefined ? (
					<ErrorComponent errorMessage={signinError} />
				) : (
					<View style={{ height: 30 }}></View>
				)} */}

				<CustomButton
					title="Sign In"
					onPress={handleSubmit(handleSigninClick)}
					buttonStyle={{
						width: width * 0.5,
						alignSelf: 'center',
						marginTop: 25,
						backgroundColor: Colors.buttonColors.primary,
					}}
				/>
			</View>
		</HideKeyboardView>
	);
};

const styles = StyleSheet.create({
	screen: {
		width,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.background,
	},
	inputContainer: {
		width: width * 0.8,
		height: 'auto',
	},
	mainTextLabelStyle: {
		fontSize: 30,
		fontWeight: 'bold',
		color: Colors.primary,
	},
	redirectToSigninStyle: {
		fontSize: 18,
		textDecorationLine: 'underline',
		marginTop: 10,
		color: Colors.primary,
	},

	errorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 5,
	},

	errorTextStyle: {
		fontSize: 14,
		color: 'red',
	},
});
