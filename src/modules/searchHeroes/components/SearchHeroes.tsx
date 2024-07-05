import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ISearchHeroes } from "shared/utils/interfaces";
import { scrollVibration } from "shared/utils/vibration";

import AllHeroes from "./AllHeroes";
import SelectedHeroes from "./SelectedHeroes";

const CARD_HEIGHT = moderateScale(60);

const SearchHeroes: React.FC<ISearchHeroes> = observer(({ filteredHeroes, selectedHeroes }) => {
	const scrollOffsetY = useRef(0);
	const lastVibrationOffset = useRef(0);

	const scrollEvent = (event: any) => {
		const currentOffsetY = event.nativeEvent.contentOffset.y;

		scrollVibration(lastVibrationOffset, scrollOffsetY, currentOffsetY, CARD_HEIGHT);
	};

	return (
		<Animated.View style={styles.scroll} entering={FadeIn.duration(100)} exiting={FadeOut.duration(100)}>
			<Animated.ScrollView
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={styles.scrollContent}
				onScroll={scrollEvent}
				scrollEventThrottle={16}
			>
				<View style={{ gap: moderateScale(10) }}>
					{selectedHeroes.length > 0 && <SelectedHeroes selectedHeroes={selectedHeroes} />}
					<AllHeroes filteredHeroes={filteredHeroes} />
				</View>
			</Animated.ScrollView>
		</Animated.View>
	);
});

const styles = StyleSheet.create({
	scroll: {
		paddingTop: verticalScale(55),
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 2,
		backgroundColor: "#1C242D",
	},
	scrollContent: {
		paddingLeft: scale(15),
		paddingRight: scale(15),
		paddingBottom: verticalScale(15),
		alignItems: "center",
	},
	selectedHero: {
		width: "100%",
		backgroundColor: "red",
		height: CARD_HEIGHT,
		maxHeight: "auto",
		justifyContent: "center",
		alignItems: "center",
	},
	selectedScrollContent: {
		paddingHorizontal: scale(15),
		alignItems: "center",
	},
	selectedHeroText: {
		marginHorizontal: scale(10),
		color: "white",
	},
});

export default SearchHeroes;
