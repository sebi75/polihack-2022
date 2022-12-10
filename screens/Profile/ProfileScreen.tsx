import React from 'react';
import { View, Text, Dimensions, StyleSheet, Platform, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, Image, } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export const ProfileScreen: React.FC = () => {
    const navigation: any = useNavigation();
    return (
        <view style={styles.profileScreen}>
            <view style={styles.profileCard}>
                <Image style={styles.profileImage} source={require('')}/>
                <Text style={styles.userName}/>
                <Text style={styles.fullName}/>
            </view>
            <view style={styles.scoreCard}>
                <Text style={styles.score}/>
            </view>
            <TouchableOpacity onPress={() => navigation.navigate("ContractScreen")}>
                My Contract:
            </TouchableOpacity>
        </view>
    );

};

const styles = StyleSheet.create({
    profileScreen: {

    },
    profileCard: {

    },
    userName: {

    },
    fullName: {

    },
    profileImage: {

    },
    scoreCard: {

    },
    score: {

    },
})