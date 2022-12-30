import React, { FunctionComponent, useEffect, useState } from 'react';
import {
	Text,
	Dimensions,
	Platform,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	View,
	Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import { avatarURL } from '../../constants/defaultAvatarURL';
import Colors from '../../constants/Colors';

import { Avatar } from 'react-native-paper';

import { useGetUser } from '../../hooks/useGetUser';
import { ErrorComponent } from '../../components/ErrorComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { useForm, Controller } from 'react-hook-form';
import { CustomButton } from '../../components';
import { editUser } from '../../api/user/editUser';
import { queryClient } from '../../App';
import { Collections } from '../../types';

import { getUserFromAsyncStorage } from '../../utils/asyncStorage';
import { IUserModel } from '../../archive/models';

const { width, height } = Dimensions.get('window');
export const EditProfileScreen: FunctionComponent = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userData, setUserData] = useState<IUserModel | null>(null);
	const [imageUri, setImageUri] = useState<string | null>(null);
	const { data, error, isLoading: isGetUserLoading } = useGetUser();
	const navigation: any = useNavigation();

	const {
		control,
		getValues,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			fullName: '',
			age: '',
			about: '',
		},
	});

	const onSubmit = async () => {
		const formValues = getValues();

		const userDataa = {
			...userData,
			...formValues,
			profilePicture: imageUri || userData?.profilePicture,
		};

		try {
			setIsLoading(true);
			const response = await editUser(userDataa, data?.userId as string);
			setIsLoading(false);
			Alert.alert('Success', 'Profile updated successfully.', [
				{
					text: 'OK',
					onPress: () => {
						navigation.goBack();
					},
				},
			]);
			queryClient.invalidateQueries({ queryKey: [Collections.users] });
		} catch (error) {}
	};

	const pickImageAsync = async () => {
		setImageUri('');
		setIsLoading(true);
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissionResult.granted === false) {
			Alert.alert(
				'Error',
				'Please allow access to media library in settings.',
				[{ text: 'OK' }]
			);
		}
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			try {
				const compressedImage = await compressImage(result.uri as string);
				setImageUri(compressedImage);
				setIsLoading(false);
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		}
		return;
	};

	const compressImage = async (uri: string) => {
		const manipResult = await ImageManipulator.manipulateAsync(
			uri,
			[{ resize: { width: 800, height: 800 } }],
			{ compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
		);

		const uploadUri =
			Platform.OS === 'ios'
				? manipResult.uri.replace('file://', '')
				: manipResult.uri;

		return uploadUri;
	};

	const picture =
		data?.profilePicture != '' && data?.profilePicture
			? data?.profilePicture
			: avatarURL;

	useEffect(() => {
		getUserFromAsyncStorage().then((user) => {
			if (user) {
				setUserData(user);
			}
		});
	}, []);

	useEffect(() => {
		if (!userData) {
			return;
		}

		reset({
			fullName: userData?.fullName || '',
			age: userData?.age || '',
			about: userData?.about || '',
		});
	}, [userData]);

	if (isGetUserLoading || isLoading) {
		return (
			<View style={styles.profileScreen}>
				<ActivityIndicator size={'large'} color={Colors.primary} />
			</View>
		);
	}

	if (error) {
		return <ErrorComponent errorMessage="An error occured loading the user!" />;
	}

	return (
		<ScrollView style={styles.profileScreen}>
			{/* row 1 */}
			<View style={styles.rowOne}>
				<TouchableOpacity onPress={pickImageAsync} style={styles.profileCard}>
					<Avatar.Image
						size={width * 0.15}
						source={{
							uri: picture,
						}}
						style={{
							marginBottom: 10,
						}}
					/>
					<CustomButton
						title="Change Picture"
						onPress={pickImageAsync}
						buttonStyle={{
							backgroundColor: Colors.primary,
							width: width * 0.5,
							marginLeft: 60,
						}}
					/>
				</TouchableOpacity>

				<View
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.input}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholderTextColor={'white'}
								placeholder={'Full Name'}
							/>
						)}
						name="fullName"
					/>
					{errors.fullName && <Text>This is required.</Text>}

					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.input}
								onBlur={onBlur}
								onChangeText={onChange}
								value={`${value}`}
								placeholderTextColor={'white'}
								placeholder={'Age'}
								keyboardType={'numeric'}
							/>
						)}
						name="age"
					/>
					{errors.age && <Text>This is required.</Text>}
				</View>
			</View>
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						multiline
						numberOfLines={4}
						style={[
							styles.input,
							{
								width: width * 0.8,
								height: height * 0.1,
								marginTop: 0,
							},
						]}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						placeholderTextColor={'white'}
						placeholder={'About'}
					/>
				)}
				name="about"
			/>
			{errors.about && <Text>This is required.</Text>}
			<CustomButton
				title={'SAVE'}
				buttonStyle={{
					backgroundColor: Colors.primary,
					width: '50%',
					height: 50,
					marginTop: 50,
					marginLeft: '25%',
				}}
				onPress={onSubmit}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	profileScreen: {
		flex: 1,
		backgroundColor: Colors.dark,
		padding: 20,
		paddingHorizontal: 35,
	},
	rowOne: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		padding: 15,
	},
	input: {
		fontSize: 16,
		paddingHorizontal: 5,
		paddingVertical: 5,
		borderWidth: 0.5,
		borderColor: 'rgba(255,255,255,0.5)',
		marginTop: 15,
		borderRadius: 8,
		marginLeft: 7,
		width: width * 0.8,
		height: 40,
		color: '#fff',
	},
	label: {
		fontSize: 20,
		fontWeight: '500',
		marginVertical: 5,
		color: 'rgba(255,255,255,0.85)',
	},
	profileCard: {
		width: width * 0.7,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
});
