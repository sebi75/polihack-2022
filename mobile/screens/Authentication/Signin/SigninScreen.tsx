import {
	View,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Text as RNText,
	Alert as RNAlert,
} from 'react-native';

import { HideKeyboardView } from '../../../components/';

import Colors from '../../../constants/Colors';
import {
	Alert,
	CloseIcon,
	HStack,
	IconButton,
	VStack,
	Text,
} from 'native-base';

import { CustomInput } from '../../../components/CustomInput';
import { CustomButton } from '../../../components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useNavigation } from '@react-navigation/native';
import { useSignin } from '../../../hooks/useSignin';
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
					queryClient.setQueryData(['client-user '], user);
					await setTokenInAsyncStorage(token);
					navigation.navigate('BottomTabNavigator');
				},
				onError: (error: any) => {
					RNAlert.alert('Error', error.message);
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
					<Text style={styles.redirectToSigninStyle}>
						Don't have an account?
					</Text>
				</TouchableOpacity>

				{error ? (
					<Alert w="100%" status={'error'}>
						<VStack space={2} flexShrink={1} w="100%">
							<HStack flexShrink={1} space={2} justifyContent="space-between">
								<HStack space={2} flexShrink={1}>
									<Alert.Icon mt="1" />
									<Text fontSize="md" color="coolGray.800">
										{(error as any).message as string}
									</Text>
								</HStack>
								<IconButton
									variant="unstyled"
									_focus={{
										borderWidth: 0,
									}}
									icon={<CloseIcon size="3" />}
									_icon={{
										color: 'coolGray.600',
									}} // set the react query error to null
									onPress={() => reset()}
								/>
							</HStack>
						</VStack>
					</Alert>
				) : (
					<></>
				)}

				{!isLoading ? (
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
		fontSize: 30,
		fontWeight: 'bold',
		color: Colors.primary,
	},
	redirectToSigninStyle: {
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
