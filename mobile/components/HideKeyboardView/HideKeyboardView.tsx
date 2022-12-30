import {
	Keyboard,
	Platform,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	StyleSheet,
	Dimensions,
} from 'react-native';
import React, { FunctionComponent, ReactNode } from 'react';

import Colors from '../../constants/Colors';

interface IHideKeyboardProps {
	children: ReactNode;
	withAvoidView: boolean;
}

const { width } = Dimensions.get('window');
export const HideKeyboardView: FunctionComponent<IHideKeyboardProps> = ({
	children,
	withAvoidView,
}) => (
	<TouchableWithoutFeedback
		onPress={() => Keyboard.dismiss()}
		style={{ overflow: 'hidden', backgroundColor: 'transparent' }}
	>
		{!withAvoidView ? (
			children
		) : (
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={15}
				style={styles.screen}
			>
				{children}
			</KeyboardAvoidingView>
		)}
	</TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
	screen: {
		width,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.background,
	},
});
