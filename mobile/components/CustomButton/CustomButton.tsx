import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

interface CustomButtonProps {
	onPress: () => void;
	title: string;
	buttonStyle?: any;
	textStyle?: any;
	disable?: boolean;
}

const { width } = Dimensions.get('window');
export const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	buttonStyle,
	textStyle,
	disable,
}) => {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			style={[styles.buttonStyle, buttonStyle, { opacity: disable ? 0.4 : 1 }]}
			onPress={onPress}
			disabled={disable}
		>
			<Text style={[styles.buttonText, textStyle]}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonStyle: {
		width: width * 0.25,
		shadowColor: '#171717',
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
	},
});
