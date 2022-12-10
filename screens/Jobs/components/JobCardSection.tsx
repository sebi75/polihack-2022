import { Text, View, StyleSheet, Dimensions } from "react-native";
import { FunctionComponent, useMemo } from "react";
import Colors from "../../../constants/Colors";
import { CustomButton } from "../../../components";

import { formatDateFromDatenow } from "../../../utils";

interface IJobCardItemProps {
  title: string;
  description: string;
  image?: string;
  estimatedEndDate: number;
  estimatedStartDate: number;
  hoursPerDay: number;
  jobDuration: number;
  jobOfferId: string;
  employerId: string;
  location: string;
}

const { width, height } = Dimensions.get("window");
export const JobCardSection: FunctionComponent<IJobCardItemProps> = ({
  description,
  employerId,
  estimatedEndDate,
  estimatedStartDate,
  hoursPerDay,
  jobDuration,
  jobOfferId,
  location,
  title,
  image,
}) => {
  const handleApplyToJob = () => {
    console.log("handle apply to job");
  };

  const startAtDateFormatted = useMemo(() => {
    const date = formatDateFromDatenow(+estimatedStartDate);
    return date;
  }, [estimatedEndDate]);

  const endAtDateFormatted = useMemo(() => {
    const date = formatDateFromDatenow(+estimatedEndDate);
    return date;
  }, []);

  return (
    <View style={detailStyles.card}>
      <Text style={[detailStyles.title]}>Job Title: {title}</Text>

      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text style={detailStyles.locationStyles}>Location: {location}</Text>
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.grey,
            borderRadius: 7,
            marginBottom: 10,
          }}
        >
          <Text style={detailStyles.description}>{description}</Text>
        </View>
      </View>

      {/* the section that displays the interval of the jobs */}
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderWidth: 1,
          borderColor: Colors.grey,
          borderRadius: 7,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            padding: 10,
            fontWeight: "500",
            color: "rgb(64,64,64)",
          }}
        >
          Starting at: {startAtDateFormatted}
        </Text>
        <Text
          style={{
            fontSize: 25,
            padding: 10,
            fontWeight: "500",
            color: "rgb(64,64,64)",
          }}
        >
          Ending at: {endAtDateFormatted}
        </Text>
      </View>

      <JobCardFooter hoursPerDay={hoursPerDay} jobDuration={jobDuration} />
      <CustomButton
        title="APPLY NOW"
        onPress={handleApplyToJob}
        textStyle={{
          fontSize: 15,
        }}
        buttonStyle={{
          width: width * 0.8,
          height: 50,
          alignSelf: "center",
          marginTop: 25,
          backgroundColor: Colors.buttonColors.primary,
        }}
      />
    </View>
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
    <View style={detailStyles.jobCardFooterContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          ...detailStyles.hoursPerDayCmp,
        }}
      >
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
          ...detailStyles.hoursPerDayCmp,
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

const detailStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    padding: 5,
  },
  image: {
    height: "5%",
    width: "5%",
    marginHorizontal: "2%",
    marginVertical: "2%",
  },
  title: {
    fontSize: 35,
    color: "rgb(64,64,64)",
    fontWeight: "500",
    marginBottom: 15,
    marginTop: 15,
  },
  description: {
    fontSize: 15,
    color: "rgb(64,64,64)",
  },
  jobCardFooterContainer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "2%",
  },
  hoursPerDayCmp: {
    padding: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
  },
  locationStyles: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgb(64,64,64)",
    marginBottom: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
