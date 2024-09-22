import SearchHeroCard from "@components/SearchHeroCard";
import SearchInput from "@components/SearchInput";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import Animated from "react-native-reanimated";

import { moderateScale } from "react-native-size-matters";
import { Store } from "store";

const Home = () => {
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardVisible(true);
		});
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardVisible(false);
		});

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		<View style={styles.container}>
			<SearchInput
				onFocus={() => setKeyboardVisible(true)}
				onBlur={() => setKeyboardVisible(false)}
			/>

			{isKeyboardVisible && (
				<Animated.ScrollView
					keyboardShouldPersistTaps="handled"
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
				>
					{Store.heroes.map((el) => (
						<SearchHeroCard key={el.id} id={el.id} localized_name={el.localized_name} image={el.image} />
					))}
				</Animated.ScrollView>
			)}
			<View style={styles.selectedHero}>
				{Store.choosedHeroes.map((el) => <Text key={el.id}>{el.localized_name}</Text>)}
			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: moderateScale(15),
	},
	scroll: {
		padding: 0,
		position: 'absolute',
		top: moderateScale(63), // adjust based on the height of the SearchInput
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
		backgroundColor: 'white', // optional: to give a background color to the scroll view
	},
	scrollContent: {
		padding: moderateScale(15),
	},
	text: {
		marginTop: moderateScale(20), // adjust as needed to make sure it's not covered by the scroll view
		zIndex: 0,
	},
	selectedHero: {
		width: '100%',
		backgroundColor: 'red',
		height: 100,
		maxHeight: 'auto'
	}
});

export default Home;
