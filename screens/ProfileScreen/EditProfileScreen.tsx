import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Text,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import { avatarURL } from "../../constants/defaultAvatarURL";
import Colors from "../../constants/Colors";

import { Avatar } from "react-native-paper";

import { useGetUser } from "../../hooks/useGetUser";
import { ErrorComponent } from "../../components/ErrorComponent";
import { ScrollView } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import { CustomButton } from "../../components";
import { editUser } from "../../api/user/editUser";
import { queryClient } from "../../App";
import { Collections } from "../../types";

const { width, height } = Dimensions.get("window");
export const EditProfileScreen: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { data, error, isLoading: isGetUserLoading } = useGetUser();
  const navigation: any = useNavigation();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: data?.fullName || "",
      age: data?.age || 18,
      about: data?.about || "",
    },
  });

  console.log(data?.fullName);

  const onSubmit = () => {
    const formValues = getValues();
    const userData = {
      ...data,
      ...formValues,
      profilePicture: imageUri || data?.profilePicture,
    };
    try {
      const response = editUser(userData, data?.userId as string);
      console.log(response);
      queryClient.invalidateQueries([Collections.users]);
    } catch (error) {}
  };

  const pickImageAsync = async () => {
    setImageUri("");
    setIsLoading(true);
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Error",
        "Please allow access to media library in settings.",
        [{ text: "OK" }]
      );
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const compressedImage = await compressImage(result.uri as string);
        setImageUri(compressedImage);
        setIsLoading(false);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    return;
  };

  const compressImage = async (uri: string) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800, height: 800 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    const uploadUri =
      Platform.OS === "ios"
        ? manipResult.uri.replace("file://", "")
        : manipResult.uri;

    return uploadUri;
  };

  const picture =
    data?.profilePicture != "" && data?.profilePicture
      ? data?.profilePicture
      : avatarURL;

  useEffect(() => {
    if (!data) {
      return;
    }
    reset({
      fullName: data?.fullName || "",
      age: data?.age || 18,
      about: data?.about || "",
    });
  }, [data]);

  if (isGetUserLoading) {
    return (
      <View style={styles.profileScreen}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return <ErrorComponent errorMessage="An error occured loading the user!" />;
  }

  return (
    <ScrollView style={styles.profileScreen}>
      {/* row 1 */}
      <View style={styles.rowOne}>
        <TouchableOpacity onPress={pickImageAsync} style={styles.profileCard}>
          <Avatar.Image
            size={width * 0.15}
            source={{
              uri: picture,
            }}
            style={{
              marginBottom: 5,
            }}
          />
          <CustomButton
            title="Change Picture"
            onPress={pickImageAsync}
            buttonStyle={{
              backgroundColor: Colors.primary,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={"white"}
                placeholder={"Full Name"}
              />
            )}
            name="fullName"
          />
          {errors.fullName && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={`${value}`}
                placeholderTextColor={"white"}
                placeholder={"Age"}
                keyboardType={"numeric"}
              />
            )}
            name="age"
          />
          {errors.age && <Text>This is required.</Text>}
        </View>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            multiline
            numberOfLines={4}
            style={[
              styles.input,
              {
                width: width * 0.8,
                height: height * 0.1,
              },
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={"white"}
            placeholder={"About"}
          />
        )}
        name="about"
      />
      {errors.about && <Text>This is required.</Text>}
      <CustomButton
        title={"SAVE"}
        buttonStyle={{
          backgroundColor: Colors.primary,
          width: "100%",
          height: 50,
          marginTop: 50,
        }}
        onPress={onSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileScreen: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: 20,
    paddingHorizontal: 35,
  },
  rowOne: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 15,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    marginTop: 10,
    borderRadius: 7,
    marginLeft: 7,
    width: width * 0.6,
    height: 40,
    color: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginVertical: 5,
    color: "rgba(255,255,255,0.85)",
  },
  profileCard: {
    width: width * 0.3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
