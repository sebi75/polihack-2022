import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, } from 'react-native';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      description: 'Lorem ipsum dolor sit amet, duo te paulo veniam, solet detraxit ne cum, pro eu convenire percipitur.',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      description: 'Lorem ipsum dolor sit amet, duo te paulo veniam, solet detraxit ne cum, pro eu convenire percipitur.',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      description: 'Lorem ipsum dolor sit amet, duo te paulo veniam, solet detraxit ne cum, pro eu convenire percipitur.',
    },
  ];
  

export const Item = ({ title, description, image }:any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
);

const styles = StyleSheet.create({
container: {
    flex: 1,
},
card: {
    backgroundColor: '#ffffff',
    paddingVertical: '10%',
    marginVertical: 12,
    marginHorizontal: '3%',
    borderRadius: 25,

},
image: {
  height: '5%',
  width: '5%',
  marginHorizontal: '2%',
  marginVertical: '2%',
},
title: {
    fontSize: 32,
    fontWeight: '500',
    marginLeft: '39%',
},
description: {
    fontSize: 16,
},
});