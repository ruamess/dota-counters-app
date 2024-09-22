import React from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

const CustomSplashScreen = () => {

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="black" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
})

export default CustomSplashScreen