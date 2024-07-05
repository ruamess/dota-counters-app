import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { IHero } from "shared/utils/interfaces";

const EnemyHeroCard: React.FC<IHero> = ({ image, localized_name }) => {
	return (
		<View style={styles.enemyHeroCard}>
			<Image source={{ uri: image }} style={styles.image} />
			<Text style={styles.heroName}>{localized_name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	enemyHeroCard: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	heroName: {
		fontSize: moderateScale(15),
		color: "white",
		marginTop: verticalScale(3),
	},
	image: {
		width: scale(90),
		height: verticalScale(50),
		borderRadius: moderateScale(10),
	},
});

export default EnemyHeroCard;
