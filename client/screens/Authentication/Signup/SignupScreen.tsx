import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { HideKeyboardView } from '../../../components/';

import Colors from '../../../constants/Colors';

import { CustomInput } from '../../../components/CustomInput';
import { CustomButton } from '../../../components';
import formReducer from '../../../components/CustomInput/inputReducer';
import { ErrorComponent } from '../../../components/ErrorComponent';

import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { signUpWithEmail } from '../../../api';
import { useGetUser } from '../../../hooks';
import { setUserToAsyncStorage } from '../../../utils';

const FORM_UPDATE = 'FORM_UPDATE';

const { width } = Dimensions.get('window');
export const SignupScreen: React.FC = () => {
	const { data } = useGetUser();
	const [formState, formDispatch] = useReducer(formReducer, initialFormState);
	const [signUpError, setSignupError] = useState<string | undefined>(undefined);
	const navigation: any = useNavigation();

	const inputChangeHandler = useCallback(
		(inputIdentifier: any, inputValue: any, inputValidity: any) => {
			formDispatch({
				type: FORM_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				inputId: inputIdentifier,
			});
		},
		[formDispatch]
	);

	const signUpHandler = async () => {
		try {
			if (formState?.isFormValid) {
				const { email, password } = formState.inputValues;
				const response = await signUpWithEmail(email, password);
				if (response) {
					await setUserToAsyncStorage(response);

					navigation.navigate('BottomTabNavigator');
				} else {
					setSignupError('Something went wrong');
				}
			}
		} catch (error: any) {
			console.log('at signup', error);
			throw new Error(error.message);
		}
	};

	useEffect(() => {
		if (data) {
			navigation.navigate('BottomTabNavigator');
		}
	}, [data]);

	return (
		<HideKeyboardView withAvoidView>
			<View style={styles.inputContainer}>
				<Text style={styles.mainTextLabelStyle}>Sign Up</Text>
				<CustomInput
					id={'email'}
					label={'Email'}
					keyboardType={'email-address'}
					required
					email
					autoCapitalize={'none'}
					errorText={'Please enter a valid email address!'}
					initialValue={''}
					onInputChange={inputChangeHandler}
				/>
				<CustomInput
					id={'password'}
					label={'Password'}
					secureTextEntry
					required
					minLength={5}
					errorText={'Please enter a valid password!'}
					initialValue={''}
					onInputChange={inputChangeHandler}
				/>

				<TouchableOpacity onPress={() => navigation.navigate('SigninScreen')}>
					<Text style={styles.redirectToSigninStyle}>
						Already have an account?
					</Text>
				</TouchableOpacity>

				{signUpError != undefined ? (
					<ErrorComponent errorMessage={signUpError} />
				) : (
					<View style={{ height: 30 }}></View>
				)}

				<CustomButton
					title="Sign Up"
					onPress={signUpHandler}
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
		backgroundColor: Colors.dark,
	},
	inputContainer: {
		width: width * 0.8,
		height: 'auto',
	},
	mainTextLabelStyle: {
		fontSize: 30,
		fontWeight: '700',
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

const initialFormState = {
	inputValues: {
		email: '',
		password: '',
	},
	inputValidities: {
		email: false,
		password: false,
	},
	isFormValid: false,
};
