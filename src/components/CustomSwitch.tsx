import React from "react";
import { Switch } from "react-native";

const CustomSwitch = ({ ...children }) => {
	return (
		<Switch
			trackColor={{ false: "#28333D", true: "#708C37" }}
			thumbColor="white"
			ios_backgroundColor="#3e3e3e"
			{...children}
		/>
	);
};

export default CustomSwitch;
