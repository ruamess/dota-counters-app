import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomSplashScreen from "components/CustomSplashScreen";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import Home from "pages/Home";
import Settings from "pages/Settings";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import getHeroesData from "shared/api/getHeroesData";
import { SettingsStore } from "shared/store/settings";
import { getVibrationData } from "shared/utils/asyncStorage";

const Stack = createNativeStackNavigator();

const App = observer(() => {
	const [isSplashScreen, setIsSplashScreen] = useState(true);

	useEffect(() => {
		const loadInitialState = async () => {
			SettingsStore.setVibration(await getVibrationData());
		};

		const fetchHeroes = async () => {
			await getHeroesData();
			setIsSplashScreen(false);
		};

		loadInitialState();
		fetchHeroes();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			{isSplashScreen ? (
				<CustomSplashScreen />
			) : (
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							contentStyle: {
								backgroundColor: "#1C242D",
							},
						}}
					>
						<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
						<Stack.Screen
							name="Settings"
							component={Settings}
							options={{
								headerShadowVisible: false,
								headerTintColor: "white",
								headerTitleAlign: "center",
								headerStyle: {
									backgroundColor: "#1C242D",
								},
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			)}
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: moderateScale(60),
		backgroundColor: "#1C242D",
	},
});

export default App;
