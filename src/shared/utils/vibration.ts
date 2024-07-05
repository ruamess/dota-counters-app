import * as Haptics from "expo-haptics";
import { Platform, Vibration } from "react-native";
import { SettingsStore } from "shared/store/settings";

export const scrollVibration = (
	lastVibrationOffset: any,
	scrollOffsetY: any,
	currentOffsetY: any,
	CARD_HEIGHT: number,
) => {
	const offsetDifference = Math.abs(currentOffsetY - lastVibrationOffset.current);

	if (offsetDifference >= CARD_HEIGHT) {
		if (SettingsStore.vibration === true) {
			Vibrate();
		}

		lastVibrationOffset.current = currentOffsetY;
	}

	scrollOffsetY.current = currentOffsetY;
};

export const Vibrate = async () => {
	if (SettingsStore.vibration === true) {
		if (Platform.OS === "android") {
			Vibration.vibrate(1);
		} else {
			Haptics.selectionAsync();
		}
	}
};
