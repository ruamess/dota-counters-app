import { observer } from "mobx-react-lite";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Store } from "store"; // Исправьте путь, если необходимо

interface ISearchHeroCard {
	id: number,
	localized_name: string;
	image: string;
}

const SearchHeroCard: React.FC<ISearchHeroCard> = observer(({ id, localized_name, image }) => {

	const selected = Store.findHeroById(id) !== -1;

	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor: selected ? 'green' : '#aaaeb5' }]}
			onPress={() => Store.addChoosedHero({ id, localized_name, image })}>
			<Image source={{ uri: image }} style={styles.image} />
			<View style={styles.textView}>
				<Text style={styles.text}>
					{localized_name}
				</Text>
			</View>
		</TouchableOpacity>
	)
});


const styles = StyleSheet.create({
	card: {
		width: '100%',
		height: verticalScale(40),
		borderRadius: moderateScale(10),
		paddingLeft: moderateScale(15),
		marginBottom: moderateScale(5),
		marginTop: moderateScale(5),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	image: {
		width: scale(60),
		height: verticalScale(30),
	},
	textView: {
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: verticalScale(40),
	},
	text: {
		fontSize: moderateScale(20)
	},
})

export default SearchHeroCard