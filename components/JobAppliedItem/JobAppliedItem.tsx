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
import { JobApplicationStatusEnum } from "../../api/models/JobApplicationModel";

interface IJobApliedItemProps {
  title: string;
  description: string;
  image?: string;
  status: string;
  estimatedEndDate: number;
  estimatedStartDate: number;
  hoursPerDay: number;
  jobDuration: number;
  jobOfferId: string;
  employerId: string;
  location: string;
  companyId: string;
  createdAt: number;
  jobApplicationId: string;
  updatedAt: number;
  userId: string;
}

const { width, height } = Dimensions.get("window");
export const JobAppliedItem: FunctionComponent<IJobApliedItemProps> = ({
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
}) => {
  const navigator: any = useNavigation();
  //navigate user to the job detail screen
  const handleJobCardPress = () => {
    return navigator.navigate("JobDetailScreen", {
      jobOfferId,
      employerId,
    });
  };

  const statusStylings = {
    [JobApplicationStatusEnum.pending]: {
      backgroundColor: Colors.yellow,
    },
    [JobApplicationStatusEnum.accepted]: {
      backgroundColor: Colors.buttonColors.success,
    },
    [JobApplicationStatusEnum.rejected]: {
      backgroundColor: Colors.buttonColors.danger,
    },
  };

  const descriptionText = `${description.slice(0, 20)}....`;
  return (
    <TouchableOpacity onPress={handleJobCardPress} style={styles.card}>
      <View>
        <Text>Application status:</Text>

        <Text
          style={{
            padding: 10,
            width: width * 0.2,
            borderRadius: 20,
            marginBottom: 7,
            marginTop: 7,
            color: "white",
            overflow: "hidden",
            backgroundColor:
              statusStylings[status as JobApplicationStatusEnum]
                .backgroundColor,
          }}
        >
          {status}
        </Text>
      </View>
      <Text style={styles.title}>{title}</Text>
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
    width: width,
    maxWidth: width,
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
    paddingVertical: "2%",
  },
  hoursPerDayCmp: {
    padding: 7,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 12,
  },
});
