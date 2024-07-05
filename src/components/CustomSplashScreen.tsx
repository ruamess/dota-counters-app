import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const CustomSplashScreen = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="white" />
			<StatusBar style="light" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CustomSplashScreen;
