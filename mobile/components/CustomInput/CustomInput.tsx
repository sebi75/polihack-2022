import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInputProps,
} from 'react-native';
import { useState } from 'react';

import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Input } from 'native-base';

interface IInputProps extends TextInputProps {
	password?: boolean;
	errorText?: string;
	inputLabel?: string;
}

const { width } = Dimensions.get('window');
export const CustomInput: React.FC<IInputProps> = ({
	value,
	onBlur,
	password,
	errorText,
	inputLabel,
	onChangeText,
	...rest
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleEyePress = () => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{inputLabel}</Text>
			<Input
				InputRightElement={
					password ? (
						<Ionicons
							name={!showPassword ? 'eye' : 'eye-off'}
							onPress={handleEyePress}
							size={20}
						/>
					) : undefined
				}
				value={value}
				onBlur={onBlur}
				variant="underlined"
				secureTextEntry={password && !showPassword}
				placeholderTextColor="#aaa"
				onChangeText={onChangeText}
				{...rest}
			/>
			{errorText && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{errorText}</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	formControl: {
		marginTop: 15,
	},
	label: {
		fontWeight: 'bold',
		marginBottom: 10,
		color: Colors.textColor,
	},
	errorContainer: {
		marginVertical: 5,
	},
	errorText: {
		fontSize: 14,
		color: Colors.buttonColors.danger,
	},
});
