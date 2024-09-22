import React from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import Ionicons from '@expo/vector-icons/Ionicons';


const SearchInput = ({ ...children }) => {

	return (
		<View style={styles.search}>
			<TextInput
				style={styles.input}
				placeholder="Search..."
				{...children}
			/>
			<View style={styles.icon}>
				<Ionicons name="search" size={verticalScale(20)} color="black" />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		height: verticalScale(40),
		fontSize: moderateScale(16),
		flex: 1,
	},
	search: {
		backgroundColor: '#aaaeb5',
		width: '100%',
		height: verticalScale(40),
		borderRadius: moderateScale(10),
		paddingLeft: moderateScale(15),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	icon: {
		height: verticalScale(40),
		width: scale(38),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
})

export default SearchInput