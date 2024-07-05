import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { ISelectedHeroes } from "shared/utils/interfaces";

import EnemyHeroCard from "./EnemyHeroCard";

const EnemyHeroes: React.FC<ISelectedHeroes> = ({ selectedHeroes }) => {
	return (
		<View style={styles.enemyHeroesContainer}>
			<Text style={styles.title}>Enemy heroes</Text>

			<View style={styles.enemyHeroesContent}>
				<View style={styles.enemyHeroesList}>
					{selectedHeroes.map((el) => (
						<EnemyHeroCard
							key={el.id}
							id={el.id}
							name={el.name}
							selected={el.selected}
							localized_name={el.localized_name}
							image={el.image}
						/>
					))}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: moderateScale(17),
		fontWeight: "bold",
		color: "white",
	},
	enemyHeroesList: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		gap: moderateScale(20),
		flexWrap: "wrap",
	},
	enemyHeroesContent: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: verticalScale(180),
	},
	enemyHeroesContainer: {
		paddingTop: moderateScale(10),
	},
});

export default EnemyHeroes;
