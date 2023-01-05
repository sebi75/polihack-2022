import { FunctionComponent, useEffect, useState } from 'react';
import {
	View,
	Text as RNText,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { HideKeyboardView } from '../../../../components';
import Colors from '../../../../constants/Colors';
import { CustomButton, CustomAlert } from '../../../../components';
import { useNavigation } from '@react-navigation/native';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodUserSignupFormSchema } from './utils';
import { CustomInput } from '../../../../components/CustomInput';

import DateTimePicker from '@react-native-community/datetimepicker';
import { formatSignupUserDate } from '../../../../utils';
import { usePostSignupUser } from './hooks';

interface SignupUserFormState {
	email: string;
	password: string;
	confirmPassword: string;
	birthday: Date;
}

const defaultFormValues = {
	email: '',
	password: '',
	confirmPassword: '',
	birthday: new Date(),
};

const { width } = Dimensions.get('window');
export const SignupUserScreen: FunctionComponent = () => {
	const navigation: any = useNavigation();
	const {
		control,
		reset: resetForm,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupUserFormState>({
		defaultValues: defaultFormValues,
		resolver: zodResolver(zodUserSignupFormSchema),
	});
	const {
		mutate,
		reset,
		error: signupError,
		isLoading: isSignupLoading,
	} = usePostSignupUser();

	const signUpHandler = (data: SignupUserFormState) => {
		const signupData = {
			password: data.password,
			email: data.email,
			birthday: formatSignupUserDate(data.birthday),
		};

		mutate(signupData, {
			onSuccess: () => {
				console.log('success');
			},
		});
	};

	useEffect(() => {
		return () => {
			resetForm(defaultFormValues);
		};
	}, []);

	return (
		<HideKeyboardView withAvoidView>
			<View style={styles.inputContainer}>
				<RNText style={styles.mainTextLabelStyle}>Sign Up</RNText>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'Email'}
							placeholder={'Enter your email'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={errors.email && errors.email.message}
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
							password
							inputLabel={'Password'}
							placeholder={'Enter your password'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={errors.password && errors.password.message}
							onChangeText={onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="confirmPassword"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							password
							inputLabel={'Confirm Password'}
							placeholder={'Enter your password'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={
								errors.confirmPassword && errors.confirmPassword.message
							}
							onChangeText={onChange}
						/>
					)}
				/>

				<View style={styles.birthdayContainer}>
					<View style={styles.inputWithLabelBirthday}>
						<RNText style={styles.birtdayLabelText}>Birthdate: </RNText>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							name="birthday"
							render={({ field: { onChange, onBlur, value } }) => {
								return (
									<DateTimePicker
										value={value}
										mode={'date'}
										is24Hour={true}
										onChange={(event, selectedDate) => onChange(selectedDate)}
									/>
								);
							}}
						/>
					</View>
					<View style={styles.errorContainer}>
						<RNText style={styles.errorTextStyle}>
							{errors.birthday?.message}
						</RNText>
					</View>
				</View>

				{signupError ? (
					<CustomAlert
						status="error"
						message={(signupError as any).message}
						onClosePress={() => reset()}
					/>
				) : null}

				<TouchableOpacity onPress={() => navigation.navigate('SigninScreen')}>
					<RNText style={styles.redirectToSigninStyle}>
						Already have an account?
					</RNText>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate('SignupEmployerScreen')}
				>
					<RNText style={styles.redirectToSigninStyle}>
						Are you an employer? Create an employer account.
					</RNText>
				</TouchableOpacity>

				{!isSignupLoading && (
					<CustomButton
						title="Sign Up"
						onPress={handleSubmit(signUpHandler)}
						buttonStyle={{
							width: width * 0.9,
							height: 50,
							alignSelf: 'center',
							marginTop: 25,
							backgroundColor: Colors.buttonColors.primary,
						}}
					/>
				)}
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
		display: 'flex',
		width: width * 0.8,
		height: 'auto',
	},
	mainTextLabelStyle: {
		fontSize: 40,
		fontWeight: '700',
		textAlign: 'center',
		color: Colors.primary,
	},
	redirectToSigninStyle: {
		marginTop: 10,
		fontSize: 14,
		textDecorationLine: 'underline',
		color: Colors.primary,
	},

	errorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 5,
	},

	errorTextStyle: {
		fontSize: 14,
		color: Colors.buttonColors.danger,
	},
	inputWithLabelBirthday: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	birthdayContainer: {
		marginTop: 25,
		marginBottom: 25,
		display: 'flex',
		flexDirection: 'column',
	},
	birtdayLabelText: {
		fontSize: 16,
		color: Colors.textColor,
		fontWeight: 'bold',
	},
});
