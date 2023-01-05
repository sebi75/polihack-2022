import { FunctionComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

import { HideKeyboardView } from '../../../../components';
import Colors from '../../../../constants/Colors';
import { CustomButton } from '../../../../components';
import { useNavigation } from '@react-navigation/native';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodThirdScreenFormSchema } from './utils';
import { CustomInput } from '../../../../components/CustomInput';

interface SignupEmployerThirdScreenProps {
	route: {
		params: {
			email: string;
			password: string;
			companyName: string;
			activityDomain: string;
			confirmPassword: string;
		};
	};
}

interface SignupEmployerFirstScreenFormState {
	city: string;
	state: string;
	streetName: string;
	streetNumber: string;
}

const { width } = Dimensions.get('window');
export const SignupEmployerThirdScreen: FunctionComponent<
	SignupEmployerThirdScreenProps
> = ({
	route: {
		params: { email, password, companyName, activityDomain, confirmPassword },
	},
}) => {
	const navigation: any = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupEmployerFirstScreenFormState>({
		defaultValues: {
			city: '',
			state: '',
			streetName: '',
			streetNumber: '',
		},
		resolver: zodResolver(zodThirdScreenFormSchema),
	});

	const handleBackClick = () => {
		navigation.goBack();
	};

	const handleSignupClick = (data: SignupEmployerFirstScreenFormState) => {
		const fullyConstructedData = {
			...data,
			email,
			password,
			companyName,
			activityDomain,
		};
	};

	return (
		<HideKeyboardView withAvoidView>
			<View style={styles.inputContainer}>
				<Text style={styles.mainTextLabelStyle}>Sign Up - Final step</Text>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="city"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'City'}
							placeholder={'Enter the city where the company is located'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={errors.city && errors.city.message}
							onChangeText={onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="state"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'State'}
							placeholder={'Enter the state where the company is located'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={errors.state && errors.state.message}
							onChangeText={onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="streetName"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'Street Name'}
							placeholder={'eg: Bulevardul Titulescu'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={errors.streetName && errors.streetName.message}
							onChangeText={onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="streetNumber"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'Street Number'}
							placeholder={'eg: 12'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={errors.streetNumber && errors.streetNumber.message}
							onChangeText={onChange}
						/>
					)}
				/>

				<View>
					<CustomButton
						title="Sign Up"
						onPress={handleSubmit(handleSignupClick)}
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
