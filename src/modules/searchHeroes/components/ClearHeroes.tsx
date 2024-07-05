import { observer } from "mobx-react-lite";
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { HomeStore } from "shared/store/home";
import { Vibrate } from "shared/utils/vibration";

const ClearHeroes = observer(() => {
	return (
		<TouchableOpacity
			onPress={() => {
				HomeStore.clearSelectedHeroes();
				Vibrate();
			}}
		>
			<Text style={[styles.title, { color: "#AF3737" }]}>Clear all</Text>
		</TouchableOpacity>
	);
});

const styles = StyleSheet.create({
	title: {
		color: "white",
	},
});

export default ClearHeroes;
