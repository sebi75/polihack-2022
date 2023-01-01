import { UserResult } from './models';
import { restService } from '../../utils';
import { USER, USERS } from '../../types/endpoints';

export const getUserByToken = async () => {
	return await restService.get<UserResult>(`/${USERS}/${USER}`, true);
};
