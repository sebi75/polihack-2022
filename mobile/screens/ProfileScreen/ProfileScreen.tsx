import React, { FunctionComponent } from 'react';
import {
	Text,
	View,
	Alert,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { avatarURL } from '../../constants/defaultAvatarURL';
import Colors from '../../constants/Colors';

import { Avatar } from 'react-native-paper';

// import { useGetUser } from '../../hooks/useGetUser';
import { ErrorComponent } from '../../components/ErrorComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButton } from '../../components';
const { width, height } = Dimensions.get('window');

export const ProfileScreen: FunctionComponent = () => {
	// const { data, error, isLoading: isGetUserLoading } = useGetUser();
	const navigation: any = useNavigation();

	const handleSignOutClick = async () => {};

	// const picture =
	// 	data?.profilePicture != '' && data?.profilePicture
	// 		? data?.profilePicture
	// 		: avatarURL;

	// if (isGetUserLoading) {
	// 	return (
	// 		<View style={styles.profileScreen}>
	// 			<ActivityIndicator size={'large'} color={Colors.primary} />
	// 		</View>
	// 	);
	// }

	const handleEditProfileClick = () => {
		return navigation.navigate('EditProfileScreen');
	};

	// if (error) {
	// 	return <ErrorComponent errorMessage="An error occured loading the user!" />;
	// }

	// const hasFullname = data?.fullName != '' && data?.fullName;
	// const hasAge = data?.age && data?.age != '';
	// const hasAbout = data?.about != '' && data?.about;

	return (
		<ScrollView style={styles.profileScreen}>
			{/* row 1 */}
			<View style={styles.rowOne}>
				<Avatar.Image
					size={width * 0.15}
					source={
						{
							// uri: picture,
						}
					}
					style={{
						marginBottom: 5,
					}}
				/>

				<View
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						marginLeft: 10,
					}}
				>
					{/* {!hasAge && (
						<Text
							style={{
								color: 'rgba(194, 67, 58, 0.70)',
								fontSize: 18,
								fontWeight: 'bold',
								marginBottom: 5,
							}}
						>
							Please enter your age
						</Text>
					)} */}
					{/* {!hasAbout && (
						<Text
							style={{
								color: 'rgba(194, 67, 58, 0.70)',
								fontSize: 18,
								fontWeight: 'bold',
								marginBottom: 5,
							}}
						>
							Please tell us about yourself
						</Text>
					)} */}
					{/* {!hasFullname && (
						<Text
							style={{
								color: 'rgba(194, 67, 58, 0.70)',
								fontSize: 18,
								fontWeight: 'bold',
								marginBottom: 5,
							}}
						>
							Please enter your full name
						</Text>
					)} */}
				</View>
			</View>
			<View>
				{/* {!hasAbout || !hasAge || !hasFullname ? (
					<Text
						style={{
							color: 'rgba(194, 67, 58, 0.70)',
							fontSize: 22,
							fontWeight: 'bold',
							marginBottom: 5,
						}}
					>
						Please complete your profile to be able to apply for jobs
					</Text>
				) : (
					<Text
						style={{
							fontSize: 22,
							fontWeight: 'bold',
							marginBottom: 5,
							color: 'rgba(92, 184, 17, 0.70)',
						}}
					>
						Congratulations! You are ready to apply for jobs
					</Text>
				)} */}
			</View>
			<CustomButton
				title={'EDIT PROFILE'}
				buttonStyle={{
					backgroundColor: Colors.primary,
					marginTop: 50,
					width: width * 0.5,
					alignSelf: 'center',
					height: 50,
				}}
				onPress={handleEditProfileClick}
			/>
			<CustomButton
				title={'Sign Out'}
				buttonStyle={{
					backgroundColor: 'rgb(64,64,64)',
					marginTop: 50,
					width: width * 0.5,
					alignSelf: 'center',
					height: 50,
				}}
				onPress={handleSignOutClick}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	profileScreen: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20,
		paddingHorizontal: 35,
	},
	rowOne: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		padding: 15,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.5)',
		marginTop: 10,
		borderRadius: 7,
		marginLeft: 7,
		width: width * 0.6,
		height: 40,
		color: '#fff',
	},
	label: {
		fontWeight: 'bold',
		marginVertical: 5,
		color: 'rgba(255,255,255,0.85)',
	},
	profileCard: {
		width: width * 0.3,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
