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
import { zodFirstScreenFormSchema } from './utils';
import { CustomInput } from '../../../../components/CustomInput';

interface SignupEmployerFirstScreenFormState {
	companyName: string;
	activityDomain: string;
}

const { width } = Dimensions.get('window');
export const SignupEmployerFirstScreen: FunctionComponent = () => {
	const navigation: any = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupEmployerFirstScreenFormState>({
		defaultValues: {
			companyName: '',
			activityDomain: '',
		},
		resolver: zodResolver(zodFirstScreenFormSchema),
	});

	const handleNextStepClick = (data: SignupEmployerFirstScreenFormState) => {
		navigation.navigate('SignupEmployerSecondScreen', {
			...data,
		});
	};

	return (
		<HideKeyboardView withAvoidView>
			<View style={styles.inputContainer}>
				<Text style={styles.mainTextLabelStyle}>Sign Up - Step 1</Text>
				{/* <Controller
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
				/> */}
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="companyName"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'Company name'}
							placeholder={'Enter the name of the company'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={errors.companyName && errors.companyName.message}
							onChangeText={onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					name="activityDomain"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							inputLabel={'Activity domain'}
							placeholder={'Enter the domain in which the company operates'}
							autoCapitalize={'none'}
							value={value}
							onBlur={onBlur}
							errorText={errors.activityDomain && errors.activityDomain.message}
							onChangeText={onChange}
						/>
					)}
				/>

				<TouchableOpacity onPress={() => navigation.navigate('SigninScreen')}>
					<Text style={styles.redirectToSigninStyle}>
						Already have an account?
					</Text>
				</TouchableOpacity>

				<CustomButton
					title="Next Step"
					onPress={handleSubmit(handleNextStepClick)}
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
