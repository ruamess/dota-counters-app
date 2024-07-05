import { makeAutoObservable } from "mobx";
import { setVibrationData } from "shared/utils/asyncStorage";

class MainStore {
	vibration: boolean = true;

	constructor() {
		makeAutoObservable(this);
	}

	async setVibration(value: boolean) {
		this.vibration = value;
		setVibrationData(value);
	}
}

export const SettingsStore = new MainStore();
