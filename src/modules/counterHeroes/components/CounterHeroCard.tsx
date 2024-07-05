import { observer } from "mobx-react-lite";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ICounterHero } from "shared/utils/interfaces";

const CounterHeroCard: React.FC<ICounterHero> = observer(
	({ id, name, localized_name, image, overallWinrate, counterpicked }) => {
		return (
			<View style={styles.counterHeroCard}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
					}}
				>
					<Image source={{ uri: image }} style={styles.image} />
					<View>
						<Text style={{ color: "white" }}>{localized_name}</Text>
						<Text style={{ color: "white" }}>Overall: {Math.round(overallWinrate)} %</Text>
					</View>
				</View>

				<View style={styles.counterHeroWinRate}>
					<View style={styles.counterHeroWinRateContent}>
						{counterpicked.map((el) => (
							<View key={el.id} style={{ display: "flex", flexDirection: "row", gap: 2 }}>
								<Image source={{ uri: el.image }} style={styles.image2} />
								<Text style={{ color: "white" }}>: {Math.round(el.winrate)} %</Text>
							</View>
						))}
					</View>
				</View>
			</View>
		);
	},
);

const styles = StyleSheet.create({
	image: {
		width: scale(90),
		height: verticalScale(50),
		borderRadius: moderateScale(10),
	},
	image2: {
		width: scale(30),
		height: verticalScale(18),
		borderRadius: moderateScale(5),
	},
	counterHeroCard: {
		backgroundColor: "#28333D",
		width: "100%",
		height: verticalScale(90),
		borderRadius: moderateScale(10),
		padding: moderateScale(15),
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	counterHeroWinRate: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	counterHeroWinRateContent: {
		display: "flex",
		gap: moderateScale(8),
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CounterHeroCard;
