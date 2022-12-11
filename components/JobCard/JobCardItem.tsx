import React, { FunctionComponent } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Colors";

import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "../CustomButton/CustomButton";

interface IJobCardItemProps {
  title: string;
  description: string;
  image?: string;
  estimatedEndDate: number;
  estimatedStartDate: number;
  hoursPerDay: number;
  employerName: string;
  jobDuration: number;
  jobOfferId: string;
  employerId: string;
  location: string;
}

const { width, height } = Dimensions.get("window");
export const JobCardItem: FunctionComponent<IJobCardItemProps> = ({
  description,
  employerId,
  estimatedEndDate,
  estimatedStartDate,
  employerName,
  hoursPerDay,
  jobDuration,
  jobOfferId,
  location,
  title,
  image,
}) => {
  const navigator: any = useNavigation();
  //navigate user to the job detail screen
  const handleJobCardPress = () => {
    return navigator.navigate("JobDetailScreen", {
      jobOfferId,
      employerId,
    });
  };

  const descriptionText = `${description.slice(0, 100)}....`;
  return (
    <TouchableOpacity onPress={handleJobCardPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text
        style={{
          fontSize: 14,
          color: Colors.textColor,
          marginBottom: 10,
        }}
      >
        Job listed by: {employerName}
      </Text>
      <Text style={styles.description}>{descriptionText}</Text>
      <JobCardFooter hoursPerDay={hoursPerDay} jobDuration={jobDuration} />
      <CustomButton
        title="See details"
        onPress={handleJobCardPress}
        buttonStyle={{
          width: width * 0.4,
          alignSelf: "center",
          marginTop: 17,
          backgroundColor: Colors.buttonColors.primary,
        }}
      />
    </TouchableOpacity>
  );
};

interface IJobCardFooterProps {
  hoursPerDay: number;
  jobDuration: number;
}

const JobCardFooter: FunctionComponent<IJobCardFooterProps> = ({
  hoursPerDay,
  jobDuration,
}) => {
  return (
    <View style={styles.jobCardFooterContainer}>
      <View style={styles.hoursPerDayCmp}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: "rgb(64,64,64)",
          }}
        >
          Norm: {`${hoursPerDay}`}h/day
        </Text>
      </View>
      {/* job duration */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          ...styles.hoursPerDayCmp,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: "rgb(64,64,64)",
          }}
        >
          Position Duration: {`${jobDuration}`} days
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 25,
  },
  image: {
    height: "5%",
    width: "5%",
    marginHorizontal: "2%",
    marginVertical: "2%",
  },
  title: {
    color: "#f58742",
    shadowColor: "#171717",
    shadowOffset: { width: 0.5, height: 1.2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "rgb(64,64,64)",
    marginBottom: 8,
  },
  jobCardFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
  },
  hoursPerDayCmp: {
    padding: 7,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 12,
  },
});
