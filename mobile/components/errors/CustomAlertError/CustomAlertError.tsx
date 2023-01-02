import React, { FunctionComponent } from 'react';
import {
	Alert,
	VStack,
	HStack,
	Text,
	IconButton,
	CloseIcon,
} from 'native-base';

interface CustomAlertErrorProps {
	errorMessage: string;
	onClosePress: () => void;
}

export const CustomAlertError: FunctionComponent<CustomAlertErrorProps> = ({
	errorMessage,
	onClosePress,
}) => {
	return (
		<Alert w="100%" status={'error'}>
			<VStack space={2} flexShrink={1} w="100%">
				<HStack flexShrink={1} space={2} justifyContent="space-between">
					<HStack space={2} flexShrink={1}>
						<Alert.Icon mt="1" />
						<Text fontSize="md" color="coolGray.800">
							{errorMessage}
						</Text>
					</HStack>
					<IconButton
						variant="unstyled"
						_focus={{
							borderWidth: 0,
						}}
						icon={<CloseIcon size="3" />}
						_icon={{
							color: 'coolGray.600',
						}} // set the react query error to null
						onPress={onClosePress}
					/>
				</HStack>
			</VStack>
		</Alert>
	);
};
