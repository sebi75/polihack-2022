import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";

import { useEffect, FunctionComponent } from "react";

import Colors from "../../constants/Colors";
import { useGetJobOffers } from "../../hooks/useGetJobOffers";
import { IJobOfferModel } from "../../api/models/JobOfferModel";

import { JobCardItem } from "../../components/JobCard";

export const JobsScreen: FunctionComponent = () => {
  const { data, error, isLoading } = useGetJobOffers();

  console.log({ data, error, isLoading });

  if (isLoading) {
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
        refreshing={isLoading}
        data={data}
        renderItem={({ item }: { item: IJobOfferModel }) => {
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
          } = item; // props destructuring
          return <JobCardItem {...item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: "center",
  },
});
