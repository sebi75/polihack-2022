import { VALIDATE_TOKEN } from '../../types/endpoints';
import { restService } from '../../utils';

export type ValidateTokenResult = {
	message: string;
};

export const validateToken = async () => {
	return restService.post<ValidateTokenResult, any>(VALIDATE_TOKEN, {}, true);
};
