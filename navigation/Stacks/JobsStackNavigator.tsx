import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";


import { Item } from '../../components/JobCard';

const JobsStack = createStackNavigator();

export const App = () => {
  return (
    <JobsStack.Navigator>
      <JobsStack.Screen
        name="App"
        component={App}
        options={{ title: 'Jobs List'}}
      />
    </JobsStack.Navigator>
  );
}