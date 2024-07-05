import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
import { ISelectedHeroes } from "shared/utils/interfaces";

import ClearHeroes from "./ClearHeroes";
import SearchHeroCard from "./SearchHeroCard";

const SelectedHeroes: React.FC<ISelectedHeroes> = ({ selectedHeroes }) => {
	return (
		<View style={styles.container}>
			<View style={{ justifyContent: "space-between", flexDirection: "row" }}>
				<Text style={styles.title}>Selected heroes</Text>
				<ClearHeroes />
			</View>

			{selectedHeroes.map((el) => (
				<Animated.View key={el.id} entering={FadeIn.duration(500)}>
					<SearchHeroCard
						id={el.id}
						selected={el.selected}
						name={el.name}
						localized_name={el.localized_name}
						image={el.image}
					/>
				</Animated.View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: moderateScale(10),
	},
	title: {
		color: "white",
	},
});

export default SelectedHeroes;
