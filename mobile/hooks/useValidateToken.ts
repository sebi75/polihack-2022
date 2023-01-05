import { useMutation } from '@tanstack/react-query';
import { validateToken } from '../api/validate-token';

export const useValidateToken = () => {
	return useMutation((data: {}) => validateToken());
};
