import { UserResultType } from './models';
import { restService } from '../../utils';
import { TOKEN_USER } from '../../types/endpoints';

export const getUserByToken = async () => {
	return await restService.get<UserResultType>(`${TOKEN_USER}`, true);
};
