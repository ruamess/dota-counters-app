import React from "react";
import { Text, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { moderateScale, verticalScale } from "react-native-size-matters";

const NoHeroes = () => {
	return (
		<Animated.View style={styles.container} entering={FadeIn.duration(100)}>
			<Text style={styles.title}>No heroes</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: verticalScale(100),
	},
	title: {
		color: "white",
		fontSize: moderateScale(14),
	},
});

export default NoHeroes;
