import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { FunctionComponent } from "react";

import Colors from "../../constants/Colors";
import { useGetUserApplications } from "../../hooks/useGetUserApplicationts";
import { IJobOfferModel } from "../../api/models/JobOfferModel";

import { JobAppliedItem } from "../../components/JobAppliedItem";
import { queryClient } from "../../App";
import { Collections } from "../../types";
import { useGetUser } from "../../hooks";

import { GetUserApplicationsResult } from "../../api/jobs/getUserApplications";

interface IJobsApplicationsScreenProps {
  route: {
    params: {
      userId: string;
    };
  };
}

const { width } = Dimensions.get("window");
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
      <View style={styles.screen}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onRefresh={() => {
          queryClient.invalidateQueries([Collections.jobOffers]);
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
    alignItems: "center",
  },
});
