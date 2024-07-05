import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const SearchInput = ({ ...children }) => {
	return (
		<Animated.View
			style={{
				width: "100%",
				alignItems: "center",
				justifyContent: "center",
				height: verticalScale(45),
				zIndex: 3,
			}}
			entering={FadeIn.duration(300)}
		>
			<View style={styles.search}>
				<TextInput style={styles.input} placeholder="Search..." placeholderTextColor="white" {...children} />

				<View style={styles.icon}>
					<Ionicons name="search" size={verticalScale(20)} color="white" />
				</View>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	input: {
		height: verticalScale(40),
		fontSize: moderateScale(16),
		flex: 1,
		color: "white",
	},
	search: {
		width: "100%",
		maxWidth: scale(400),
		backgroundColor: "#2E3740",
		height: verticalScale(40),
		borderRadius: moderateScale(10),
		paddingLeft: moderateScale(15),
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		zIndex: 20,
	},
	icon: {
		height: verticalScale(40),
		width: scale(38),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default SearchInput;
