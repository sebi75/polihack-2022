import {
	View,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	Dimensions,
} from 'react-native';

import { FunctionComponent } from 'react';

import Colors from '../../constants/Colors';
// import { useGetJobOffers } from '../../hooks/useGetJobOffers';
import { IJobOfferModel } from '../../archive/models/JobOfferModel';

import { JobCardItem } from '../../components/JobCard';
import { queryClient } from '../../App';

const { width } = Dimensions.get('window');
export const JobsScreen: FunctionComponent = () => {
	// const { data, error, isLoading } = useGetJobOffers();

	// if (isLoading) {
	// 	return (
	// 		<View style={styles.screen}>
	// 			<ActivityIndicator size={'large'} color={Colors.primary} />
	// 		</View>
	// 	);
	// }

	return (
		<View style={styles.screen}>
			{/* <FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				// onRefresh={() => {
				// 	queryClient.invalidateQueries([Collections.jobOffers]);
				// }}
				// refreshing={isLoading}
				data={data}
				renderItem={({ item }: { item: IJobOfferModel }) => {
					const {
						companyId,
						description,
						employerId,
						employerName,
						estimatedEndDate,
						estimatedStartDate,
						hoursPerDay,
						jobDuration,
						jobOfferId,
						location,
						title,
					} = item; // props destructuring
					return <JobCardItem {...item} />;
				}}
			/> */}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		//paddingTop: '5%',
		paddingBottom: '5%',
		backgroundColor: Colors.dark,
		alignItems: 'center',
	},
});
