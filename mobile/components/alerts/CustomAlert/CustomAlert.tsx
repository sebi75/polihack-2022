import React, { FunctionComponent } from 'react';
import {
	Alert,
	VStack,
	HStack,
	Text,
	IconButton,
	CloseIcon,
} from 'native-base';

interface CustomAlertProps {
	message: string;
	status: 'error' | 'success' | 'warning' | 'info' | undefined;
	onClosePress: () => void;
}

export const CustomAlert: FunctionComponent<CustomAlertProps> = ({
	status,
	message,
	onClosePress,
}) => {
	return (
		<Alert w="100%" status={status}>
			<VStack space={2} flexShrink={1} w="100%">
				<HStack flexShrink={1} space={2} justifyContent="space-between">
					<HStack space={2} flexShrink={1}>
						<Alert.Icon mt="1" />
						<Text fontSize="md" color="coolGray.800">
							{message}
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
