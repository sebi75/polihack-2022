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
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: '#f58742',
            borderRadius: 10,
            marginBottom: 35,
            marginTop: 5,
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
          marginVertical: 3,
          borderWidth: 1,
          borderColor: '#f58742',
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 23,
            padding: 6,
            fontWeight: "500",
            color: "rgb(64,64,64)",
          }}
        >
          From: {startAtDateFormatted}
        </Text>
        <Text
          style={{
            fontSize: 23,
            padding: 6,
            fontWeight: "500",
            color: "rgb(64,64,64)",
          }}
        >
          Until: {endAtDateFormatted}
        </Text>
        <JobCardFooter hoursPerDay={hoursPerDay} jobDuration={jobDuration} />
        <Text style={detailStyles.locationStyles}>Location: {location}</Text>
      </View>
      <CustomButton
        title="APPLY NOW"
        onPress={handleApplyToJob}
        textStyle={{
          fontSize: 22,
          fontWeight: '500',
        }}
        buttonStyle={{
          width: width * 0.5,
          height: 50,
          alignSelf: "center",
          marginTop: 35,
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
            fontSize: 20,
            padding: 5,
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
            fontSize: 20,
            padding: 5,
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
    color: "#f58742",
    fontWeight: "500",
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 25,
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  description: {
    fontSize: 20,
    color: "rgb(64,64,64)",
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  jobCardFooterContainer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "2%",
  },
  hoursPerDayCmp: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
  },
  locationStyles: {
    fontSize: 22,
    align: 'center',
    fontWeight: "500",
    color: "rgb(64,64,64)",
    marginBottom: 10,
    paddingHorizontal: 25,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
