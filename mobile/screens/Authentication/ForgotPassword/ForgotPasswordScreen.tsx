import React, { FunctionComponent } from 'react';
import {
	View,
	Text as RNText,
	StyleSheet,
	ActivityIndicator,
	Dimensions,
} from 'react-native';
import {
	HideKeyboardView,
	CustomInput,
	CustomButton,
	CustomAlert,
} from '../../../components/';

import { useForm, Controller } from 'react-hook-form';
import Colors from '../../../constants/Colors';

import { usePostForgotPassword } from './hooks/usePostForgotPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodForgotPasswordFormSchema } from './utils/zodForgotPasswordFormSchema';

interface ForgotPasswordFormState {
	email: string;
	confirmEmail: string;
}

const { width, height } = Dimensions.get('window');
export const ForgotPasswordScreen: FunctionComponent = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordFormState>({
		defaultValues: {
			email: '',
			confirmEmail: '',
		},
		resolver: zodResolver(zodForgotPasswordFormSchema),
	});
	const {
		mutate,
		reset,
		error: forgotPasswordError,
		isLoading: isForgotPasswordLoading,
		data: postForgotPasswordData,
	} = usePostForgotPassword();

	const onSubmit = (data: ForgotPasswordFormState) => {
		mutate(data, {
			onSuccess: () => {
				console.log('success');
			},
		});
	};

	console.log({ errors });

	return (
		<HideKeyboardView withAvoidView>
			<View style={styles.inputContainer}>
				<RNText style={styles.mainTextLabelStyle}>Forgot Password</RNText>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'Email'}
							placeholder={'Enter yout email'}
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
					name="confirmEmail"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'Confirm Email'}
							placeholder={'Confirm your email'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={errors.confirmEmail && errors.confirmEmail.message}
							onChangeText={onChange}
						/>
					)}
				/>
				{forgotPasswordError ? (
					<CustomAlert
						status={'error'}
						message={(forgotPasswordError as any).message}
						onClosePress={() => reset()}
					/>
				) : (
					<></>
				)}

				{!isForgotPasswordLoading ? (
					<>
						<CustomButton
							title="Submit"
							onPress={handleSubmit(onSubmit)}
							buttonStyle={{
								width: width * 0.9,
								height: 50,
								alignSelf: 'center',
								marginTop: 25,
								backgroundColor: Colors.buttonColors.primary,
							}}
						/>
					</>
				) : (
					<ActivityIndicator size={'small'} color={Colors.primary} />
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
		backgroundColor: Colors.background,
	},
	inputContainer: {
		width: width * 0.8,
		height: height * 0.7,
		justifyContent: 'space-evenly',
		padding: 15,
	},
	mainTextLabelStyle: {
		fontSize: 40,
		fontWeight: '700',
		textAlign: 'center',
		color: Colors.primary,
	},
	redirectStyle: {
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
		color: 'red',
	},
});
