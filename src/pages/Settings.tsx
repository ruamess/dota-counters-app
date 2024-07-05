import CustomSwitch from "components/CustomSwitch";
import { observer } from "mobx-react-lite";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { SettingsStore } from "shared/store/settings";
import { Vibrate } from "shared/utils/vibration";

const Settings = observer(() => {
	return (
		<View style={styles.container}>
			<View style={styles.settings}>
				<View style={styles.setting}>
					<Text style={styles.title}>Vibration</Text>
					<CustomSwitch
						onValueChange={() => {
							SettingsStore.setVibration(!SettingsStore.vibration);
							Vibrate();
						}}
						value={SettingsStore.vibration}
					/>
				</View>
				{/* <Text>tg:@evilwhy</Text> */}
			</View>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	setting: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	settings: {
		width: "80%",
	},
	title: {
		color: "white",
		fontSize: moderateScale(17),
	},
});

export default Settings;
