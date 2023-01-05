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
import { zodSecondScreenFormSchema } from './utils';
import { CustomInput } from '../../../../components/CustomInput';

interface SignupEmployerSecondScreenProps {
	route: {
		params: {
			companyName: string;
			activityDomain: string;
		};
	};
}

interface SignupEmployerSecondScreenFormState {
	email: string;
	password: string;
	confirmPassword: string;
}

const { width } = Dimensions.get('window');
export const SignupEmployerSecondScreen: FunctionComponent<
	SignupEmployerSecondScreenProps
> = ({
	route: {
		params: { activityDomain, companyName },
	},
}) => {
	const navigation: any = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupEmployerSecondScreenFormState>({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(zodSecondScreenFormSchema),
	});

	const handleBackClick = () => {
		navigation.goBack();
	};

	const handleNextStepClick = (data: SignupEmployerSecondScreenFormState) => {
		navigation.navigate('SignupEmployerThirdScreen', {
			...data,
			activityDomain,
			companyName,
		});
	};

	return (
		<HideKeyboardView withAvoidView>
			<View style={styles.inputContainer}>
				<Text style={styles.mainTextLabelStyle}>Sign Up - Step 2/3</Text>
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

				<View>
					{/* <CustomButton
						title="Back"
						onPress={handleBackClick}
						buttonStyle={{
							width: width * 0.9,
							height: 50,
							alignSelf: 'center',
							marginTop: 25,
							backgroundColor: Colors.buttonColors.primary,
						}}
					/> */}
					<CustomButton
						title="Next Step"
						onPress={handleSubmit(handleNextStepClick)}
						buttonStyle={{
							width: width * 0.9,
							height: 50,
							alignSelf: 'center',
							marginTop: 25,
							backgroundColor: Colors.buttonColors.primary,
						}}
					/>
				</View>
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
		fontSize: 40,
		fontWeight: '700',
		textAlign: 'center',
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
