import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Dimensions,
	TextInputProps,
} from 'react-native';

import Colors from '../../constants/Colors';

interface IInputProps extends TextInputProps {
	inputLabel?: string;
	errorText?: string;
}

const { width } = Dimensions.get('window');
export const CustomInput: React.FC<IInputProps> = ({
	inputLabel,
	errorText,
	onChangeText,
	value,
	onBlur,
}) => {
	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{inputLabel}</Text>
			<TextInput
				style={styles.input}
				value={value}
				placeholderTextColor="#aaa"
				onBlur={onBlur}
				onChangeText={onChangeText}
			/>
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>{errorText}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	formControl: {
		marginTop: 15,
	},
	label: {
		fontWeight: 'bold',
		marginVertical: 5,
		color: Colors.textColor,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderWidth: 2,
		borderColor: 'rgba(255,255,255,0.2)',
		borderRadius: 7,
		backgroundColor: 'rgba(255,255,255,0.15)',
		width: width * 0.7,
		height: 40,
		color: '#fff',
	},

	errorContainer: {
		marginVertical: 5,
	},

	errorText: {
		fontSize: 14,
		color: Colors.buttonColors.danger,
	},
});
