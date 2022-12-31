import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FunctionComponent, useState } from 'react';

import Colors from '../../constants/Colors';

// import { useGetJobByJobOfferId } from "../../hooks/useGetJobByJobOfferId";
import { JobCardSection } from './components/JobCardSection';

interface IJobDetailScreenProps {
	route: {
		params: {
			jobOfferId: string;
			employerId: string;
		};
	};
}

const { width, height } = Dimensions.get('window');
export const JobDetailScreen: FunctionComponent<IJobDetailScreenProps> = ({
	route,
}) => {
	const { employerId, jobOfferId } = route.params;
	// const { data, isLoading, error } = useGetJobByJobOfferId(jobOfferId);

	// if (isLoading) {
	//   return (
	//     <View>
	//       <ActivityIndicator size={"large"} color={Colors.primary} />
	//     </View>
	//   );
	// }

	return (
		<ScrollView
			style={{
				backgroundColor: 'white',
			}}
		>
			{/* <View style={styles.screen}>{data && <JobCardSection {...data} />}</View> */}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		width,
		height: height * 0.87,
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
