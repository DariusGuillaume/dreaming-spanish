import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Page = () => {
  return (
    <Stack.Screen
      options={{
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => {}} style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/home-logo.png')}
              style={styles.logoImage}
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerLeft: {
    marginLeft: 20,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});