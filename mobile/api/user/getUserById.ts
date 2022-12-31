import { UserResult } from './models';
import { restService } from '../../utils';
import { USERS } from '../../types/endpoints';

export const getUserById = async (userId: string) => {
	return restService.get<UserResult>(`/${USERS}/${userId}`, true);
};
