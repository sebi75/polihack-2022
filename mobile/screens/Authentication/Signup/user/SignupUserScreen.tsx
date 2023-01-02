import { FunctionComponent } from 'react';
import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { HideKeyboardView } from '../../../../components';
import Colors from '../../../../constants/Colors';
import { CustomButton } from '../../../../components';
import { useNavigation } from '@react-navigation/native';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodUserSignupFormSchema } from '../utils';
import { CustomInput } from '../../../../components/CustomInput';

interface SignupUserFormState {
	email: string;
	password: string;
	confirmPassword: string;
}

const { width } = Dimensions.get('window');
export const SignupUserScreen: FunctionComponent = () => {
	const navigation: any = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupUserFormState>({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(zodUserSignupFormSchema),
	});

	const signUpHandler = () => {};

	return (
		<HideKeyboardView withAvoidView>
			<View style={styles.inputContainer}>
				<Text style={styles.mainTextLabelStyle}>Sign Up</Text>
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

				<TouchableOpacity onPress={() => navigation.navigate('SigninScreen')}>
					<Text style={styles.redirectToSigninStyle}>
						Already have an account?
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate('SignupEmployerScreen')}
				>
					<Text style={styles.redirectToSigninStyle}>
						Are you an employer? Create an employer account.
					</Text>
				</TouchableOpacity>

				{/* {signUpError != undefined ? (
					<ErrorComponent errorMessage={signUpError} />
				) : (
					<View style={{ height: 30 }}></View>
				)} */}

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
