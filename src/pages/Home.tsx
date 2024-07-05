import SearchInput from "components/SearchInput";
import SettingsButton from "components/SettingsButton";
import { observer } from "mobx-react-lite";
import { CounterHeroes } from "modules/counterHeroes";
import EnemyHeroes from "modules/enemyHeroes/components/EnemyHeroes";
import { SearchHeroes } from "modules/searchHeroes";
import React, { useState, useEffect } from "react";
import { StyleSheet, Keyboard, View } from "react-native";
import Animated from "react-native-reanimated";
import { HomeStore } from "shared/store/home";
import { IHero } from "shared/utils/interfaces";

interface HomeProps {
	navigation: any;
}

const Home: React.FC<HomeProps> = observer(({ navigation }) => {
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredHeroes, setFilteredHeroes] = useState<IHero[]>(HomeStore.unselectedHeroes);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardVisible(true);
		});
		const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardVisible(false);
		});

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	useEffect(() => {
		if (searchQuery === "") {
			setFilteredHeroes(HomeStore.unselectedHeroes);
		} else {
			const filtered = HomeStore.unselectedHeroes.filter((hero) =>
				hero.localized_name.toLowerCase().includes(searchQuery.toLowerCase()),
			);
			setFilteredHeroes(filtered);
		}
	}, [searchQuery, HomeStore.unselectedHeroes]);

	return (
		<Animated.View style={styles.container}>
			<SearchInput
				onFocus={() => setKeyboardVisible(true)}
				onBlur={() => setKeyboardVisible(false)}
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			{isKeyboardVisible && (
				<SearchHeroes filteredHeroes={filteredHeroes} selectedHeroes={HomeStore.selectedHeroes} />
			)}

			{HomeStore.selectedHeroes.length > 0 ? (
				<>
					<EnemyHeroes selectedHeroes={HomeStore.selectedHeroes} />
					<CounterHeroes counterHeroes={HomeStore.filteredCounterHeroes} />
				</>
			) : (
				<View style={styles.settingsButtonContainer}>
					<SettingsButton onPress={() => navigation.navigate("Settings")} />
				</View>
			)}
		</Animated.View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		paddingTop: 0,
	},
	settingsButtonContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		gap: 20,
		paddingBottom: 30,
	},
});

export default Home;
