import { auth } from '../../config';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { getUser } from '../user/getUser';
import { setUserToAsyncStorage } from '../../utils/asyncStorage';
import { IUserModel } from '../models';

export const signInWithEmail = async (
	email: string,
	password: string
): Promise<IUserModel | undefined> => {
	let returnedUser: IUserModel | undefined;
	await signInWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			const user = userCredential.user;
			const tokenPromise = await user.getIdTokenResult();
			const token = tokenPromise.token;

			try {
				const userFromDb = await getUser(email);
				returnedUser = userFromDb;
				if (userFromDb) {
					//set user in async storage
					await setUserToAsyncStorage(userFromDb);
				}
			} catch (error) {}
		})
		.catch((error) => {
			const errorCode = error.code;
			returnedUser = undefined;
			throw Error(errorCode);
		});

	return returnedUser;
};
