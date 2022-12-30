import {
	View,
	Text,
	FlatList,
	Dimensions,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';

import { FunctionComponent } from 'react';

import Colors from '../../constants/Colors';
import { useGetUserApplications } from '../../hooks/useGetUserApplicationts';
import { IJobOfferModel } from '../../archive/models/JobOfferModel';

import { JobAppliedItem } from '../../components/JobAppliedItem';
import { queryClient } from '../../App';
import { Collections } from '../../types';
import { useGetUser } from '../../hooks';

import { GetUserApplicationsResult } from '../../archive/jobs/getUserApplications';
import { ScrollView } from 'react-native-gesture-handler';

interface IJobsApplicationsScreenProps {
	route: {
		params: {
			userId: string;
		};
	};
}

const { width } = Dimensions.get('window');
export const JobsApplicationsScreen: FunctionComponent<
	IJobsApplicationsScreenProps
> = ({ route }) => {
	const { userId } = route.params;
	const { data: userData, isLoading: isUserDataLoading } = useGetUser();
	const {
		data: userApplicationsData,
		error,
		isLoading: isUserApplicationsLoading,
	} = useGetUserApplications(userId);

	if (isUserApplicationsLoading) {
		return (
			<View style={[styles.screen, { justifyContent: 'center' }]}>
				<ActivityIndicator size={'large'} color={Colors.primary} />
			</View>
		);
	}

	if (userApplicationsData && userApplicationsData.length === 0) {
		return (
			<View style={[styles.screen, { justifyContent: 'center' }]}>
				<Text
					style={{
						color: Colors.primary,
						fontSize: 18,
						textAlign: 'center',
					}}
				>
					You have not applied to any job offers yet.
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				onRefresh={() => {
					queryClient.invalidateQueries([Collections.jobApplications, userId]);
				}}
				refreshing={isUserApplicationsLoading}
				data={userApplicationsData as any}
				renderItem={({ item }: { item: GetUserApplicationsResult }) => {
					const {
						companyId,
						description,
						employerId,
						estimatedEndDate,
						estimatedStartDate,
						hoursPerDay,
						jobDuration,
						jobOfferId,
						location,
						title,
						createdAt,
						jobApplicationId,
						status,
						updatedAt,
						userId,
					} = item; // props destructuring
					return <JobAppliedItem {...item} />;
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		maxWidth: width,
		backgroundColor: Colors.dark,
		alignItems: 'center',
	},
});
