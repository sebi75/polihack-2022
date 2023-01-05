import {
	View,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Text as RNText,
} from 'react-native';

import { HideKeyboardView } from '../../../components/';

import Colors from '../../../constants/Colors';
import { CustomAlert } from '../../../components/alerts';

import { CustomInput } from '../../../components/CustomInput';
import { CustomButton } from '../../../components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useNavigation } from '@react-navigation/native';
import { useSignin } from './hooks/useSignin';
import { ActivityIndicator } from 'react-native-paper';
import { zodSigninFormSchema } from './utils';
import { setTokenInAsyncStorage } from '../../../utils';
import { queryClient } from '../../../App';

interface SigninFormState {
	email: string;
	password: string;
}

const { width, height } = Dimensions.get('window');
export const SigninScreen: React.FC = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SigninFormState>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(zodSigninFormSchema),
	});
	const { mutate, isLoading, error, reset } = useSignin();
	const navigation: any = useNavigation();

	const handleSigninClick = (data: SigninFormState) => {
		mutate(
			{
				email: data.email,
				password: data.password,
			},
			{
				onSuccess: async (data) => {
					const { token, user } = data.data;

					console.log({ token, user });
					queryClient.setQueryData(['client-user'], user);
					await setTokenInAsyncStorage(token);
					navigation.navigate('MainEntryUserBottomTabNavigator');
				},
			}
		);
	};

	return (
		<HideKeyboardView withAvoidView>
			<View style={styles.inputContainer}>
				<RNText style={styles.mainTextLabelStyle}>Sign In</RNText>
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
				<TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
					<RNText style={styles.redirectStyle}>Don't have an account?</RNText>
				</TouchableOpacity>

				{error ? (
					<CustomAlert
						message={(error as any).message}
						status="error"
						onClosePress={() => reset()}
					/>
				) : (
					<></>
				)}

				{!isLoading ? (
					<>
						<CustomButton
							title="Sign In"
							onPress={handleSubmit(handleSigninClick)}
							buttonStyle={{
								width: width * 0.9,
								height: 50,
								alignSelf: 'center',
								marginTop: 25,
								backgroundColor: Colors.buttonColors.primary,
							}}
						/>
						<TouchableOpacity
							onPress={() => navigation.navigate('ForgotPasswordScreen')}
						>
							<RNText style={[styles.redirectStyle, { textAlign: 'center' }]}>
								Forgot Password?
							</RNText>
						</TouchableOpacity>
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
