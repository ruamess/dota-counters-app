module.exports = {
	presets: ["babel-preset-expo"],
	plugins: [
		[
			"module-resolver",
			{
				root: ["./src"],
				alias: {
					"@components": "./src/components",
					"@screens": "./src/screens",
					"@shared": "./src/shared",
				},
			},
		],
		"react-native-reanimated/plugin",
	],
};
